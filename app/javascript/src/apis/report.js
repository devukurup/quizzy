import axios from "axios";

const exportData = () => axios.get("/export");

const exportStatus = ({ job_id }) => axios.get(`/export_status/${job_id}`);

const exportDownload = ({ job_id }) => axios.get(`/export_download/${job_id}`);

const reportsApi = {
  exportData,
  exportStatus,
  exportDownload,
};

export default reportsApi;
