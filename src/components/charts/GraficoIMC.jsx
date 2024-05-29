import * as React from 'react';
import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Cookies from 'universal-cookie';
import { listarRegistroMedicoPorPerfilPaciente } from '../../services/api';
import { calculateBMI, transformFromWcfDate, calculateMonthsDifference, monthsToYears } from '../../utils/helpers';

const LineDataset = () => {
  const [data, setData] = useState([]);
  const cookies = new Cookies();
  const perfilActivo = cookies.get('perfilActivo');
  const edadTotalMeses = perfilActivo.edadAnios * 12 + perfilActivo.edadMeses;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listarRegistroMedicoPorPerfilPaciente(perfilActivo.id);
        if (response.Success && response.RegistrosMedicos) {
          // Ordenar los registros médicos por fecha
          const sortedRecords = response.RegistrosMedicos.sort((a, b) => new Date(transformFromWcfDate(a.fecha)) - new Date(transformFromWcfDate(b.fecha)));

          const birthDate = new Date(transformFromWcfDate(perfilActivo.fechaNacimiento));
          const formattedData = sortedRecords.map((registro) => {
            const registroDate = new Date(transformFromWcfDate(registro.fecha));
            const ageInMonths = calculateMonthsDifference(birthDate, registroDate);
            const ageInYears = parseFloat(monthsToYears(ageInMonths));
            const bmi = calculateBMI(registro.datos.peso, registro.datos.talla);
            return { age: ageInYears, bmi, date: registroDate.toISOString().split('T')[0] };
          });
          setData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [perfilActivo.id, perfilActivo.fechaNacimiento]);

  return (
    <LineChart
      xAxis={[
        {
          dataKey: 'age',
          valueFormatter: (value) => value.toString(),
          min: 0,
          max: edadTotalMeses / 12,
        },
      ]}
      series={[
        {
          dataKey: 'bmi',
          label: 'BMI',
          color: 'blue',
          showMark: true,
        }
      ]}
      dataset={data}
      height={500}
      legend={{ hidden: false }}
      margin={{ top: 5 }}
      tooltip={{
        formatter: (params) => {
          const { age, bmi, date } = params.point;
          return [
            { name: 'Age (years)', value: age },
            { name: 'BMI', value: bmi },
            { name: 'Date', value: date },
          ];
        },
      }}
      stackingOrder="descending"
    />
  );
};

export default LineDataset;
