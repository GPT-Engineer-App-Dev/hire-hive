import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

const fetchFeaturedJobs = async () => {
  const response = await fetch("/api/featured-jobs");
  if (!response.ok) {
    throw new Error("Failed to fetch featured jobs");
  }
  return response.json();
};

const fetchFeaturedCompanies = async () => {
  const response = await fetch("/api/featured-companies");
  if (!response.ok) {
    throw new Error("Failed to fetch featured companies");
  }
  return response.json();
};

const Index = () => {
  const { data: jobs, error: jobsError, isLoading: jobsLoading } = useQuery({
    queryKey: ["featuredJobs"],
    queryFn: fetchFeaturedJobs,
  });

  const { data: companies, error: companiesError, isLoading: companiesLoading } = useQuery({
    queryKey: ["featuredCompanies"],
    queryFn: fetchFeaturedCompanies,
  });

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Find Your Dream Job</h1>
        <p className="text-lg">Search for jobs, companies, and more.</p>
        <div className="flex justify-center space-x-2">
          <Input placeholder="Job title" className="max-w-xs" />
          <Input placeholder="Location" className="max-w-xs" />
          <Button>Search</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Featured Jobs</h2>
        {jobsLoading ? (
          <p>Loading...</p>
        ) : jobsError ? (
          <p>Error loading jobs</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{job.company}</p>
                  <p>{job.location}</p>
                  <p>{job.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Featured Companies</h2>
        {companiesLoading ? (
          <p>Loading...</p>
        ) : companiesError ? (
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

export default Index;