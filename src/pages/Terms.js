import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height:100vh; background:${({ theme }) => theme.colors.primary}; color:${({ theme }) => theme.colors.text};
  padding:7.5rem clamp(1.2rem,4vw,3rem) 4rem; line-height:1.65; transition:background .4s ease, color .4s ease; position:relative;
  max-width: 1100px; margin:0 auto; font-size:clamp(.9rem,1rem + .2vw,1.05rem);
`;

const Title = styled.h1`margin:0 0 2.5rem; font-size:clamp(2.2rem,4.5vw,3.4rem); font-weight:700; letter-spacing:-.02em; color:${({ theme }) => theme.colors.secondary};`;
const Article = styled.section`margin:0 0 2.2rem;`; 
const Heading = styled.h2`margin:0 0 .85rem; font-size:clamp(1.15rem,2.2vw,1.55rem); font-weight:600; letter-spacing:.02em; color:${({ theme }) => theme.colors.secondary};`;
const Sub = styled.h3`margin:2rem 0 .75rem; font-size:1rem; font-weight:600; letter-spacing:.05em; text-transform:uppercase; opacity:.8; color:${({ theme }) => theme.colors.textMedium};`;
const Paragraph = styled.p`margin:.75rem 0;`;
const List = styled.ul`margin:.5rem 0 1rem 1.25rem; padding:0; list-style:disc; li{margin:.4rem 0;}`;
const BackLink = styled.a`position:fixed; top:1rem; left:1rem; background:${({ theme }) => theme.colors.secondary}; color:${({ theme }) => theme.colors.primary}; text-decoration:none; padding:.55rem .9rem; border-radius:.55rem; font-size:.7rem; font-weight:600; letter-spacing:.05em; box-shadow:0 4px 16px -6px rgba(0,0,0,.35); transition:background .35s ease, transform .35s ease; &:hover{background:${({ theme }) => theme.colors.accent}; transform:translateY(-2px);} &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:3px;}`;

const Terms = () => (
  <Wrapper id="terms">
    <BackLink href="#home">← Back</BackLink>
    <Title>Terms and Conditions</Title>

    <Article>
      <Heading>Article 1 – Scope and Definitions</Heading>
      <Paragraph>1.1 These Terms and Conditions govern the provision of IT consulting and development services by Encelyte, a consulting and development firm specializing in IT, technology, and artificial intelligence solutions.</Paragraph>
      <Paragraph>1.2 Encelyte operates with branches in Cyprus and Lebanon, strategically connecting European and Middle East and Africa (MEA) markets.</Paragraph>
      <Paragraph>1.3 These terms apply to all services provided by Encelyte, including but not limited to IT consulting, AI development, website development, application development, and strategic technological planning.</Paragraph>
    </Article>

    <Article>
      <Heading>Article 2 – Service Definitions</Heading>
      <Paragraph><strong>Encelyte:</strong> Refers to Encelyte, LLC, a consulting and development firm providing IT, technology, and AI solutions.</Paragraph>
      <Paragraph><strong>Client:</strong> Any natural or legal person who enters into a service agreement with Encelyte.</Paragraph>
      <Paragraph><strong>Services:</strong> All consulting, development, and technological services provided by Encelyte, including:</Paragraph>
      <List>
        <li>Custom IT and AI consulting services</li>
        <li>Website development and design</li>
        <li>Application development (mobile and web applications)</li>
        <li>Strategic technological planning and integration</li>
        <li>AI solution development and implementation</li>
        <li>Cross-regional market technology consulting</li>
      </List>
      <Paragraph><strong>Project:</strong> Any specific assignment or engagement undertaken by Encelyte for a Client.</Paragraph>
    </Article>

    <Article>
      <Heading>Article 3 – Service Delivery and Scope</Heading>
      <Paragraph>3.1 Encelyte provides comprehensive consulting and development services that address business challenges by leveraging localized market knowledge and cross-regional expertise.</Paragraph>
      <Paragraph>3.2 Services are delivered through project-based contracts, retainer consulting agreements, and technology development services for clients in both MEA and European markets.</Paragraph>
      <Paragraph>3.3 Each project will be defined by a detailed scope of work, timeline, and deliverables agreed upon between Encelyte and the Client.</Paragraph>
      <Paragraph>3.4 Encelyte reserves the right to subcontract certain aspects of the work to qualified third-party providers while maintaining overall project responsibility.</Paragraph>
    </Article>

    <Article>
      <Heading>Article 4 – Client Responsibilities</Heading>
      <Paragraph>4.1 The Client agrees to provide accurate and complete information necessary for the successful delivery of services.</Paragraph>
      <Paragraph>4.2 The Client is responsible for:</Paragraph>
      <List>
        <li>Providing timely feedback and approvals</li>
        <li>Ensuring compliance with applicable laws and regulations</li>
        <li>Maintaining appropriate security measures for any systems or data provided</li>
        <li>Obtaining necessary licenses and permissions for third-party content or services</li>
      </List>
      <Paragraph>4.3 The Client acknowledges that delays in providing required information or approvals may impact project timelines and delivery dates.</Paragraph>
    </Article>

    <Article>
      <Heading>Article 5 – Intellectual Property Rights</Heading>
      <Paragraph>5.1 All intellectual property created by Encelyte during the course of providing services remains the property of Encelyte unless otherwise specified in writing.</Paragraph>
      <Paragraph>5.2 Encelyte grants the Client a non-exclusive, non-transferable license to use the deliverables for the intended purpose as specified in the project agreement.</Paragraph>
      <Paragraph>5.3 The Client retains ownership of any pre-existing intellectual property provided to Encelyte for the project.</Paragraph>
      <Paragraph>5.4 Any third-party intellectual property incorporated into deliverables will be subject to the respective third-party license terms.</Paragraph>
    </Article>

    <Article>
      <Heading>Article 6 – Confidentiality and Data Protection</Heading>
      <Paragraph>6.1 Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of the engagement.</Paragraph>
      <Paragraph>6.2 Encelyte will implement appropriate security measures to protect Client data and information.</Paragraph>
      <Paragraph>6.3 The Client is responsible for ensuring compliance with applicable data protection laws and regulations in their jurisdiction.</Paragraph>
      <Paragraph>6.4 Confidentiality obligations survive the termination of the service agreement.</Paragraph>
    </Article>

    <Article>
      <Heading>Article 7 – Payment Terms</Heading>
      <Paragraph>7.1 Payment terms will be specified in individual project agreements and may include:</Paragraph>
      <List>
        <li>Project-based pricing with milestone payments</li>
        <li>Retainer agreements with monthly or quarterly billing</li>
        <li>Hourly rates for consulting services</li>
      </List>
      <Paragraph>7.2 Invoices are due within 30 days of issuance unless otherwise specified.</Paragraph>
      <Paragraph>7.3 Late payments may result in suspension of services and may incur additional charges.</Paragraph>
      <Paragraph>7.4 All fees are exclusive of applicable taxes, which will be added to invoices as required by law.</Paragraph>
    </Article>

    <Article>
      <Heading>Article 8 – Limitation of Liability</Heading>
      <Paragraph>8.1 Encelyte's liability is limited to the amount paid by the Client for the specific services giving rise to the claim.</Paragraph>
      <Paragraph>8.2 Encelyte is not liable for any indirect, incidental, or consequential damages.</Paragraph>
      <Paragraph>8.3 Encelyte does not guarantee specific business outcomes or results from the implementation of technology solutions.</Paragraph>
      <Paragraph>8.4 The Client acknowledges that technology solutions may require ongoing maintenance and updates.</Paragraph>
    </Article>

    <Article>
      <Heading>Article 9 – Termination</Heading>
      <Paragraph>9.1 Either party may terminate the service agreement with 30 days written notice.</Paragraph>
      <Paragraph>9.2 Encelyte may terminate immediately if the Client fails to make timely payments or breaches material terms of the agreement.</Paragraph>
      <Paragraph>9.3 Upon termination, the Client will pay for all services rendered up to the termination date.</Paragraph>
    </Article>

    <Article>
      <Heading>Article 10 – Force Majeure</Heading>
      <Paragraph>10.1 Neither party shall be liable for any delay or failure to perform due to circumstances beyond their reasonable control, including but not limited to natural disasters, government actions, or technological failures.</Paragraph>
      <Paragraph>10.2 The affected party will notify the other party promptly of any force majeure event and its expected duration.</Paragraph>
    </Article>

    <Article>
      <Heading>Article 11 – Governing Law and Dispute Resolution</Heading>
      <Paragraph>11.1 These terms are governed by the laws of the jurisdiction where Encelyte's primary office is located.</Paragraph>
      <Paragraph>11.2 Any disputes will be resolved through good faith negotiations between the parties.</Paragraph>
      <Paragraph>11.3 If negotiations fail, disputes may be resolved through mediation or arbitration as specified in individual agreements.</Paragraph>
    </Article>

    <Article>
      <Heading>Article 12 – Amendments and Updates</Heading>
      <Paragraph>12.1 Encelyte reserves the right to update these terms and conditions from time to time.</Paragraph>
      <Paragraph>12.2 Clients will be notified of any material changes to these terms.</Paragraph>
      <Paragraph>12.3 Continued use of services after notification of changes constitutes acceptance of the updated terms.</Paragraph>
    </Article>

    <Article>
      <Heading>Article 13 – Contact Information</Heading>
      <Paragraph>For questions regarding these terms and conditions, please contact Encelyte at:</Paragraph>
      <Paragraph><strong>Email:</strong> contact@encelyte.com</Paragraph>
      <Paragraph><strong>Website:</strong> https://encelyte.com</Paragraph>
      <Paragraph style={{marginTop:'2rem', fontSize:'.8rem', opacity:.65}}>Last Updated: August 2025</Paragraph>
    </Article>
  </Wrapper>
);

export default Terms;
