import React,{useState} from 'react';

import axios from 'axios'

import {v4 as uuidv4} from "uuid";
import { useEffect } from 'react';

function GetApi(){
    var url = "https://test.aqmeter.com/v2/test/payment-history"
    const[data,setData] = useState([]);
    var tableBody = [];
    var heading = [
        "documentDate",
        "documentType",
        "invoiceId",
        "paymentId",
        "invoiceValue"
    ];
    const getDate = (string)=>{
        var options = {year:"numeric", month:"long", day:"numeric"};
        return new Date(string).toLocaleDateString([],options);
    };
    if(data){
        tableBody=[];
        data.map((payment)=>{
            tableBody.push(
                [
                    getDate(payment.documentDate),
                    payment.documentType,
                    payment.erpInvoiceId,
                    payment.erpPaymentId,
                    payment.invoiceNumber,
                    payment.invoiceSerial,
                    payment.invoiceValue
                ]
            )
        })
    }
  

    
    const loadData = async()=>{
        const response = await axios.get(url);
        setData(response.data)
    }
    useEffect(()=>{
        loadData()
    },[])


    return(
        <div>
            <table style={{width:1000}}>
                <thead>
                    <tr>
                        {heading.map((head)=>(
                            <th key={uuidv4()}>{head}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {tableBody.map((payment)=>{
                        return(
                            <tr key={uuidv4()}>
                               { payment.map((item)=>{
                                    return <td key={uuidv4()}>
                                        {item}
                                    </td>
                                }

                                )}
                         </tr>
                        )
                    })}
                </tbody>
            </table>

            <br />
            <button onClick={loadData}>Refresh</button>
        </div>
    )
}

export default GetApi;