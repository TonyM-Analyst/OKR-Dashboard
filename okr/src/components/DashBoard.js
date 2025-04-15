import { useState } from 'react';
import { Tabs, Tab, Card, CardContent, CardHeader } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LabelList } from 'recharts';

const mockOKRData = [
  { objective: 'Improve Dev Speed', team: 'Engineering', progress: 80 },
  { objective: 'Boost Conversion Rate', team: 'Marketing', progress: 65 },
  { objective: 'Reduce Downtime', team: 'Ops', progress: 45 },
  { objective: 'Increase Retention', team: 'Customer Success', progress: 70 },
];

export default function OKRDashboard() {
  const [selectedTeam, setSelectedTeam] = useState('All');

  const filteredData =
    selectedTeam === 'All'
      ? mockOKRData
      : mockOKRData.filter((okr) => okr.team === selectedTeam);

  return (
    <div className="p-6">
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Team OKR Tracker</h2>
        </CardHeader>
        <CardContent>
          <Tabs
            value={selectedTeam}
            onChange={(_, value) => setSelectedTeam(value)}
            aria-label="team filter"
          >
            <Tab label="All" value="All" />
            <Tab label="Engineering" value="Engineering" />
            <Tab label="Marketing" value="Marketing" />
            <Tab label="Ops" value="Ops" />
            <Tab label="Customer Success" value="Customer Success" />
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData} layout="vertical" margin={{ left: 50, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="objective" />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="progress" fill="#4f46e5">
                <LabelList dataKey="progress" position="right" formatter={(val) => `${val}%`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
