import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height:100vh; background:${({ theme }) => theme.colors.primary}; color:${({ theme }) => theme.colors.text};
  padding:6.5rem clamp(1.2rem,4vw,3rem) 4rem; line-height:1.65; transition:background .4s ease, color .4s ease; position:relative;
  max-width: 1100px; margin:0 auto; font-size:clamp(.9rem,1rem + .2vw,1.05rem);
`;

const Title = styled.h1`margin:0 0 2.5rem; font-size:clamp(2.2rem,4.5vw,3.4rem); font-weight:700; letter-spacing:-.02em; color:${({ theme }) => theme.colors.secondary};`;
const Section = styled.section`margin:0 0 2.2rem;`;
const Heading = styled.h2`margin:0 0 .85rem; font-size:clamp(1.15rem,2.2vw,1.55rem); font-weight:600; letter-spacing:.02em; color:${({ theme }) => theme.colors.secondary};`;
const Paragraph = styled.p`margin:.75rem 0;`;
const List = styled.ul`margin:.5rem 0 1rem 1.25rem; padding:0; list-style:disc; li{margin:.4rem 0;}`;
const BackLink = styled.a``;

const Privacy = () => (
  <Wrapper id="privacy">
    <Title>Privacy Policy</Title>
    <Section>
      <Paragraph>At Encelyte, we are committed to protecting your privacy and safeguarding your personal information. This Privacy Policy explains how we collect, use, and protect the data you provide to us through our IT consulting and development services, website interactions, and client communications. As a consulting and development firm specializing in IT, technology, and artificial intelligence solutions, we understand the importance of data security and privacy in today's digital landscape.</Paragraph>
    </Section>

    <Section>
      <Heading>Information We Collect</Heading>
      <Paragraph>We collect information that you provide directly to us, including:</Paragraph>
      <List>
        <li><strong>Contact Information:</strong> Name, email address, phone number, and company details when you engage our consulting services or request information about our IT and AI development solutions.</li>
        <li><strong>Project Information:</strong> Technical requirements, business objectives, and project specifications when you seek our development or consulting services.</li>
        <li><strong>Communication Data:</strong> Correspondence, feedback, and support requests related to our services.</li>
        <li><strong>Website Usage:</strong> Information about how you interact with our website, including pages visited, time spent, and technical data such as IP address and browser type.</li>
        <li><strong>Service Delivery Data:</strong> Information necessary for providing our IT consulting, website development, application development, and AI solution services.</li>
      </List>
    </Section>

    <Section>
      <Heading>How We Use Your Information</Heading>
      <Paragraph>We use the collected information for the following purposes:</Paragraph>
      <List>
        <li><strong>Service Delivery:</strong> To provide and maintain our IT consulting and development services, including website development, application development, and AI solution implementation.</li>
        <li><strong>Client Communication:</strong> To communicate with you about project progress, service updates, and respond to inquiries about our technology solutions.</li>
        <li><strong>Service Improvement:</strong> To analyze usage patterns and improve our consulting and development services based on client feedback and market trends.</li>
        <li><strong>Business Operations:</strong> To manage client relationships, process payments, and maintain our service quality across our Cyprus and Lebanon operations.</li>
        <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations governing our consulting and development services.</li>
      </List>
    </Section>

    <Section>
      <Heading>Cookies and Tracking Technologies</Heading>
      <List>
        <li><strong>Essential Cookies:</strong> Necessary for the operation of our website and enable core functionalities such as security, network management, and accessibility.</li>
        <li><strong>Analytics Cookies:</strong> Used to gather information about how visitors interact with our website, helping us improve our services and understand client needs.</li>
        <li><strong>Service Cookies:</strong> Support delivery of our consulting and development services, including session management and user preferences.</li>
        <li><strong>Cookie Preferences:</strong> You can modify browser settings to decline cookies, though this may affect functionality.</li>
      </List>
    </Section>

    <Section>
      <Heading>Data Sharing and Third Parties</Heading>
      <Paragraph>We may share your information with trusted third parties in the following circumstances:</Paragraph>
      <List>
        <li><strong>Service Providers:</strong> Trusted technology partners assisting in delivering our services.</li>
        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and those of our clients.</li>
        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets.</li>
        <li><strong>Client Consent:</strong> We do not sell or lease personal information without explicit permission.</li>
      </List>
    </Section>

    <Section>
      <Heading>Data Security and Protection</Heading>
      <List>
        <li><strong>Encryption:</strong> Industry-standard encryption protects data in transit and at rest.</li>
        <li><strong>Access Controls:</strong> Limited to authorized personnel.</li>
        <li><strong>Regular Audits:</strong> Security assessments ensure systems remain secure.</li>
        <li><strong>Training:</strong> Ongoing data protection and privacy training.</li>
      </List>
      <Paragraph>However, no method of transmission or electronic storage is completely secure.</Paragraph>
    </Section>

    <Section>
      <Heading>Your Rights and Choices</Heading>
      <Paragraph>You have the following rights regarding your personal information:</Paragraph>
      <List>
        <li><strong>Access</strong> – Request access to the personal data we hold.</li>
        <li><strong>Correction</strong> – Request correction of inaccurate or incomplete information.</li>
        <li><strong>Deletion</strong> – Request deletion subject to legal obligations.</li>
        <li><strong>Portability</strong> – Request a structured, machine-readable copy.</li>
        <li><strong>Objection</strong> – Object to certain processing activities.</li>
      </List>
      <Paragraph>To exercise these rights, contact us using the information below.</Paragraph>
    </Section>

    <Section>
      <Heading>International Data Transfers</Heading>
      <Paragraph>As a company with operations in Cyprus and Lebanon serving European and MEA clients, data may be transferred across borders. We ensure such transfers comply with applicable data protection laws and include appropriate safeguards.</Paragraph>
    </Section>

    <Section>
      <Heading>Children's Privacy</Heading>
      <Paragraph>Our services are not intended for individuals under 18. We do not knowingly collect data from children. If you believe we have collected such data, contact us immediately.</Paragraph>
    </Section>

    <Section>
      <Heading>Changes to This Privacy Policy</Heading>
      <Paragraph>We may update this Privacy Policy to reflect changes in practices, technology, or legal requirements. Updates will include a revised "Last Updated" date. Continued use of services constitutes acceptance.</Paragraph>
    </Section>

    <Section>
      <Heading>Contact Information</Heading>
      <Paragraph><strong>Email:</strong> contact@encelyte.com</Paragraph>
      <Paragraph>We are committed to responding to inquiries and addressing any privacy concerns.</Paragraph>
      <Paragraph style={{marginTop:'2rem', fontSize:'.8rem', opacity:.65}}>Last Updated: August 2025</Paragraph>
    </Section>
  </Wrapper>
);

export default Privacy;
