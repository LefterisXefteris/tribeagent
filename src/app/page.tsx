import Head from "next/head";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Automation. Websites. AI.</title>
        <meta name="description" content="Tribe Agent: Creating tomorrow's tech for solo & small businesses." />
      </Head>

      <main className={styles.main}>
        {/* Navigation */}
        <nav className={styles.nav}>
          <div className={styles.logo}>■●▲</div>
          <div className={styles.navLinks}>
            <Link href="#portfolio">Portfolio</Link>
            <Link href="#services">Services</Link>
            <Link href="#contact">Contact</Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Automation. Websites. AI.</h1>
          <h2 className={styles.heroSubtitle}>
            Tribe Agent: Creating tomorrow's tech for solo &amp; small businesses.
          </h2>
          <div className={styles.heroButton}>
            <a href="#contact" className="btn btn-primary">
              Get Started
            </a>
          </div>

          <div className={`glass-card ${styles.heroCard}`}>
            <div className={`${styles.shape} ${styles.square}`}></div>
            <div className={`${styles.shape} ${styles.circle}`}></div>
            <div className={`${styles.shape} ${styles.triangle}`}></div>
          </div>
        </section>

        {/* AI Solutions Section */}
        <section id="services" className={styles.splitSection}>
          <div className={styles.splitSectionLeft}>
            <h2 className={styles.splitTitle}>AI-native solutions for real impact.</h2>
            <p className={styles.splitSubtitle}>
              Built and deployed cutting-edge AI projects, from VLM health checks to e-commerce innovation.
            </p>
          </div>
          <div className={`glass-card ${styles.splitCard}`}>
            <div className={`${styles.shape} ${styles.triangle} ${styles.largeShape}`}></div>
          </div>
        </section>

        {/* n8n Automations Section */}
        <section className={styles.splitSection}>
          <div className={styles.splitSectionLeft}>
            <h2 className={styles.splitTitle}>n8n automations that save your time.</h2>
            <p className={styles.splitSubtitle}>
              Automate repetitive tasks and streamline your workflow with custom n8n integrations.
            </p>
          </div>
          <div className={`glass-card ${styles.splitCard}`}>
            <div className={`${styles.shape} ${styles.square} ${styles.largeShape}`}></div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className={styles.portfolio}>
          <h3 className={styles.portfolioTitle}>A Diversified Portfolio</h3>
          <p className={styles.portfolioText}>
            I'm Lefteris Gilmaz, a sole trader passionate about harnessing automation and AI to power modern business. From AI-powered health checks to automated workflows and seamless Shopify integrations, I keep pushing the boundaries of what's possible.
          </p>
          <p className={styles.portfolioText}>
            Curious about what's next? Watch this space as I turn new ideas into innovative, real-world solutions for ambitious entrepreneurs and solo founders.
          </p>
        </section>

        <div className={styles.divider}></div>

        {/* CTA Section */}
        <section id="contact" className={styles.cta}>
          <h2 className={styles.ctaTitle}>Ready to Innovate?</h2>
          <p className={styles.ctaSubtitle}>
            Let's transform your workflow or AI ambitions. Get<br />in touch now.
          </p>
          <a href="mailto:contact@tribeagent.com" className="btn btn-primary">
            Contact
          </a>
        </section>
      </main>
    </>
  );
}
