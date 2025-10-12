import React from "react";

const settingsForm = =>{
    return(
        <div style={{ padding: '20px' }}>
            <h2>Site Setting Management</h2>
            <p>
                As an Admin, you can use this page to view and update key-value 
                configuration data from the **Settings Model**. 
                (This component would house the actual form logic to update the Setting records.)
            </p>
            <p style={{ color: 'orange' }}>
                Note: The required "Settings" functionality can also be fully met by just using the 
                standard AdminJS interface for the "Setting" resource, which is restricted to Admins.
            </p>
        </div>
    )
}

export default SettingsForm;