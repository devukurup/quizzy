import axios from "axios";

const exportData = () => axios.get("/reports/export");

const generateReport = () => axios.get(`/reports/generate_report/`);

const exportStatus = ({ job_id }) =>
  axios.get(`/reports/${job_id}/export_status`);

const reportsApi = {
  exportData,
  exportStatus,
  generateReport,
};

export default reportsApi;
