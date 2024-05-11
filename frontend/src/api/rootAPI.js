// export const flaskBackendAPI = `https://fb79-212-104-231-177.ngrok-free.app`;
export const flaskBackendAPI = `http://127.0.0.1:5000`;
export const localAPI = `http://localhost:4000/api`;



export const recommendAPI = `${flaskBackendAPI}/recommend`;
export const predictAPI = `${flaskBackendAPI}/predict`;

// PROJECT API ================================================
export const getAllProjectAPI = `${localAPI}/projects/getAll/projects`;
export const saveProjectAPI = `${localAPI}/projects/`;
export const deleteProjectAPI = `${localAPI}/projects/`;
export const searchProjectAPI = `${localAPI}/projects/`;
export const updateProjectAPI = `${localAPI}/projects/`;


// STAFF API ==================================================
export const getAllStaffAPI = `${localAPI}/staff/`;
export const saveStaffAPI = `${localAPI}/staff/`;
export const searchStaffAPI = `${localAPI}/staff/`;
export const updateStaffAPI = `${localAPI}/staff/`;
export const deleteStaffAPI = `${localAPI}/staff/`;

// SALES API ====================================================
export const getAllSalesAPI = `${localAPI}/sales/`;
export const saveSalesAPI = `${localAPI}/sales/`;
export const searchSalesAPI = `${localAPI}/sales/`;
export const updateSalesAPI = `${localAPI}/sales/`;
export const deleteSalesAPI = `${localAPI}/sales/`;
