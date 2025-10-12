import React from "react";

const Dashboard = (props)=>{
    const {title,summary, isAdmin} = props.data.content;

    const cardStyle = {
        padding: '20px',
        margin: '10px 0',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    };

    return(
        <div style={{padding:'20px'}}>
            <h2>{title}</h2>
            <hr />

            {isAdmin ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }} >
                    {summary.map((item,index)=>(
                        <div key={index} style={{ ...cardStyle, width: '200px', backgroundColor: '#e9f7ff' }}>
                             <h3 style={{ margin: '0 0 10px 0', color: '#0056b3' }}>{item.title}</h3>
                            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{item.value}</p>
                        </div>
                    ))}
                   
                </div>
            ):(
                <div style={cardStyle}>
                    <p style={{ fontSize: '18px' }}>
                         Welcome back! You are logged in as a Regular User. 
                        Your access is limited to Orders and Products.
                    </p>
                    <div style={{ marginTop: '15px', color: '#555' }}>
                       Recent orders and personal information would be displayed here.
                    </div>
                </div>
            )}


        </div>
    );

};

export default Dashboard;   