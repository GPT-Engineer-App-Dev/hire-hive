import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p>
          If you have any questions or need assistance, please feel free to
          reach out to us using the contact form below or via email or phone.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Contact Form</h2>
        <form className="space-y-4">
          <Input placeholder="Your Name" />
          <Input placeholder="Your Email" />
          <Textarea placeholder="Your Message" />
          <Button type="submit">Send Message</Button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Contact Information</h2>
        <p>Email: support@jobfinder.com</p>
        <p>Phone: (123) 456-7890</p>
      </section>
    </div>
  );
};

export default Contact;