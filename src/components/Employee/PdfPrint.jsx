import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  header: { textAlign: "center", fontSize: 18, fontWeight: "bold" },
  content: { marginTop: 20 },
  footer: { marginTop: 30, textAlign: "center", fontSize: 10 },
});

const PdfPrint = ({ asset }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Asset Information</Text>
        <View style={styles.content}>
          <Text>Asset Name: {asset?.asset?.name}</Text>
          <Text>Asset Type: {asset?.asset?.product_type}</Text>
          <Text>
            Request Date: {new Date(asset?.request_date).toLocaleDateString()}
          </Text>
          <Text>
            Approval Date: {new Date(asset?.approval_date).toLocaleDateString()}
          </Text>
          <Text>Status: {asset?.status}</Text>
        </View>
        <Text style={styles.footer}>
          Printed on: {new Date().toLocaleDateString()}
        </Text>
      </Page>
    </Document>
  );
};

export default PdfPrint;
