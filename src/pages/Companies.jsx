import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const fetchCompanies = async () => {
  const response = await fetch("/api/companies");
  if (!response.ok) {
    throw new Error("Failed to fetch companies");
  }
  return response.json();
};

const Companies = () => {
  const { data: companies, error, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Companies</h1>
        <div className="flex space-x-2">
          <Input placeholder="Search companies" className="max-w-xs" />
          <Select>
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Location" className="max-w-xs" />
        </div>
      </section>

      <section className="space-y-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading companies</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies.map((company) => (
              <Card key={company.id}>
                <CardHeader>
                  <CardTitle>{company.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{company.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Companies;