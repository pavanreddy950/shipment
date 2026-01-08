'use client';

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartData } from '@/types';

interface BarChartProps {
  data: ChartData[];
  dataKey?: string;
  color?: string;
}

export default function BarChart({ data, dataKey = 'value', color = '#3b82f6' }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a1a24" />
        <XAxis 
          dataKey="label" 
          stroke="#64748b" 
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="#64748b" 
          fontSize={12}
          tickLine={false}
          tickFormatter={(value) => {
            if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
            return value;
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#13131a',
            border: '1px solid #1a1a24',
            borderRadius: '8px',
            color: '#f8fafc',
          }}
          labelStyle={{ color: '#94a3b8' }}
        />
        <Bar 
          dataKey={dataKey} 
          fill={color}
          radius={[8, 8, 0, 0]}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
