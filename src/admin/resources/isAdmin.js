const isAdmin = ({currentAdmin}) =>{
    return currentAdmin && currentAdmin.role === 'admin';
};

module.exports = isAdmin;