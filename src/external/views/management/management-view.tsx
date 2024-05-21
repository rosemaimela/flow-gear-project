import React, { useEffect, useState } from 'react';
import * as xlsx from 'xlsx' ;
import css from './management-view.module.css';
import { useNavigate } from 'react-router-dom';
import AppSearchInput from 'assets/bootstrap/input/search-input/search-input';
import { HttpClientService } from 'service/http-client-service/http-client.service';
import AppH2 from 'assets/bootstrap/header/h2/h2';
import AppNumberInput from 'assets/bootstrap/input/number-input/number-input';
import AppButton from 'assets/bootstrap/button/button';
import SaveIcon from 'assets/images/icons/save/save';
import { saveAs } from 'file-saver';
import { Base64 } from 'js-base64';
import { parse } from 'uuid';


const AppManagementPage = () => {

    const httpClientService: HttpClientService = new HttpClientService();

   const navigate = useNavigate();
    // const StockReportDownloader = () => {
        const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [fileName, setFileName] = useState('data.xlsx');
  let stockResponse :String;
  const [jsonString, setJsonString] = useState('');
  const [responseDate, setResponseData] = useState('');


    
        let requestBody = {
            startDate,
            endDate
       // };

        
    }
    const downloadReport = () => {
        requestBody.startDate = startDate;
        requestBody.endDate = endDate;

        httpClientService.get<Object, Object>(
            "/stockhistory/stock", 
            requestBody,
            {  },
            true
        ).then((response) => {
    
      const responseString = JSON.stringify(response);

      const base64String = response ["stock_history_report"];
      console.log("base64 :", base64String)

            // Decode the Base64 string
      //const byteCharacters = Base64.decode(base64String);

      // Convert byte characters to a byte array
      const byteNumbers = new Array(base64String.length);
      for (let i = 0; i < base64String.length; i++) {
        byteNumbers[i] = base64String.charCodeAt(i);
      }
      // Create a Blob from the byte array
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Save the Blob as an Excel file
      saveAs(blob, fileName);
          

        }).catch((error) => {
            console.error('Error downloading the report:', error);
        });

    }


        return (
            <main className={css.main}>
            <>hello</>
                <AppH2 className={css.h2} title='Add Stock' />
                <div className={css.add_stock}>
                    <AppSearchInput
                        className={css.search_input}
                        placeholder='Search...'
                    />
                    <AppNumberInput
                        placeholder='Quantity'
                        className={css.quantity_input}
                    />
                    <AppButton className={css.save_button}>
                        <SaveIcon />
                    </AppButton>
                </div>
                <AppButton className={css.import_excel_button}>
                    Import Excel
                </AppButton>

                <AppH2 className={css.h2} title='Get Current Stock Report' />
                <div className={css.date_range}>
                    <input
                        placeholder='From'
                        className={css.quantity_input}
                        type="date"
                         value={startDate}
                         onChange={(e) => setStartDate(e.target.value)}
                    
                        
                    />
                    <input
                        placeholder='To'
                        className={css.quantity_input}
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}

                    />
                </div>
                <AppButton className={css.download_excel_button} onClick={downloadReport}>
                    Download Report
                </AppButton>
            </main>
        );
    };



    export default AppManagementPage;
