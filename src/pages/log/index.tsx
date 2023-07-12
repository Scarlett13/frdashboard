import Layout from "@/components/layout";
import Table from "@/components/table";

export default function Log() {
  return (
    <Layout showSideBar={false}>
      <div className="mt-24">
        <Table />
      </div>
    </Layout>
  );
}
