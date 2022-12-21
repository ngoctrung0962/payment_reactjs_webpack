import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './FormResult.css'

function FormResult() {
    const [query,setQuery] =  useSearchParams();
    console.log(query.get('resultCd'))
    const resultCd = query.get('resultCd');
    const resultMsg = query.get('resultMsg');
    const merTrxId = query.get('merTrxId');
    const trxId = query.get('trxId');
    const amount = query.get('amount');
    const currency = query.get('currency');
    const invoiceNo = query.get('invoiceNo')
    return (
        <div className='wrap'>
            <h1 className='form__tilte'>FORM RESULT</h1>
            <hr className='form_hr' />
            <form className='form_container' id="formresult" name="formresult">
                <div className='form__left'>
                    <h4 className='form__field'>Payment result code:</h4>
                    <h4 className='form__field'>Payment result message:</h4>
                    <h4 className='form__field'>Payment result amount:</h4>
                    <h4 className='form__field'>OrderNO/InvoiceNo:</h4>
                    <h4 className='form__field'>Merchant Transaction ID:</h4>
                    <h4 className='form__field'>Megapay Transaction ID:</h4>
                </div>
                <div className='form__right'>
                    <p className='form_content'>{resultCd ? resultCd : ""}</p>
                    <p className='form_content'>{resultMsg ? resultMsg : ""}</p>
                    <p className='form_content'>{amount ? amount : ""} {currency ? currency :""}</p>
                    <p className='form_content'>{invoiceNo ? invoiceNo : ""}</p>
                    <p className='form_content'>{merTrxId ?merTrxId:""}</p>
                    <p className='form_content'>{trxId ? trxId : ""}</p>
                </div>
            </form>
        </div>
    );
}

export default FormResult;