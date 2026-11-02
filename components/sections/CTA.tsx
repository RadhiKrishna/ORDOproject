import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site-data";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-panel">
      <div className="absolute inset-0 bg-grid bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] opacity-60" />
      <Reveal className="max-w-content mx-auto px-6 md:px-10 py-16 md:py-20 relative flex flex-wrap items-center justify-between gap-8">
        <div>
          <p className="font-mono text-xs text-gold tracking-wide uppercase mb-2">
            Let&apos;s Work Together
          </p>
          <h2 className="font-display text-2xl md:text-3xl text-paper max-w-md">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-mute text-sm mt-2 max-w-md">
            Our team is here to help with your technical services, maintenance
            needs or specialist district cooling requirements.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contact" variant="gold">
            Start a Project
          </Button>
          <Button href="/contact" variant="secondary-dark">
            Request a Service
          </Button>
          <div className="text-xs text-paper/80 font-mono sm:ml-2 flex flex-col gap-1.5">
            <div>
              <span className="text-mute">Operations (24/7): </span>
              <a
                href={`tel:${site.operationsPhone.replace(/\s/g, "")}`}
                className="text-gold hover:text-gold2 transition-colors inline-block"
              >
                {site.operationsPhone}
              </a>
            </div>
            <div>
              <span className="text-mute">Customer Service: </span>
              <a
                href={`tel:${site.customerServicePhone.replace(/\s/g, "")}`}
                className="text-paper/90 hover:text-gold transition-colors inline-block"
              >
                {site.customerServicePhone}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
