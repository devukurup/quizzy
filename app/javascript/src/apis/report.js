import axios from "axios";

const exportData = () => axios.get("/export");

const generateReport = () => axios.get(`/reports/generate_report/`);

const exportStatus = ({ job_id }) => axios.get(`/export_status/${job_id}`);

const exportDownload = ({ job_id }) => axios.get(`/export_download/${job_id}`);

const reportsApi = {
  exportData,
  exportStatus,
  exportDownload,
  generateReport,
};

export default reportsApi;
