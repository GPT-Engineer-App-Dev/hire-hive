import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const applicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  resume: z.instanceof(File).refine(file => file.size > 0, "Resume is required"),
  coverLetter: z.string().min(1, "Cover letter is required"),
});

const JobApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("resume", data.resume[0]);
      formData.append("coverLetter", data.coverLetter);
      formData.append("jobId", jobId);

      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      toast("Application submitted successfully", {
        description: "Your application has been submitted.",
      });
      form.reset();
      navigate("/jobs");
    } catch (error) {
      toast.error("Error submitting application", {
        description: error.message,
      });
    }
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Apply for Job</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Letter</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your cover letter" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit Application</Button>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default JobApplication;