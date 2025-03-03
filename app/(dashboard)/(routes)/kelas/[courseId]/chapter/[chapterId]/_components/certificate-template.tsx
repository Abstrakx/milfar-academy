import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';

interface CertificateTemplateProps {
  name: string;
  courseTitle: string;
  completionDate: string;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF'
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  nameText: {
    position: 'absolute',
    top: '40%', 
    transform: 'translateX(-0%)',
    fontSize: 38, 
    fontWeight: 'bold',
    color: '#23533B',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center', 
    width: '100%',
  },
  courseTitleText: {
    position: 'absolute',
    top: '58%', 
    transform: 'translateX(-0%)',
    fontSize: 28, 
    fontWeight: 'bold',
    color: '#23533B',
    textAlign: 'center',
    width: '100%',
  },
  completionDateText: {
    position: 'absolute',
    top: '73%', 
    transform: 'translateX(-0%)',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    width: '100%',
  }
});

const CertificateTemplate = ({ name, courseTitle, completionDate }: CertificateTemplateProps) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.container}>
        <Image 
          src="/certificate-bg.png" 
          style={styles.backgroundImage}
        />
        <Text style={styles.courseTitleText}>
          {courseTitle}
        </Text>
        <Text style={styles.nameText}>
            {name}
        </Text>
        <Text style={styles.completionDateText}>
          {completionDate}
        </Text>
      </View>
    </Page>
  </Document>
);

export default CertificateTemplate;