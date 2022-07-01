import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useRef, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import $ from 'jquery'
import { sha256 } from 'js-sha256'
import './Form.css'
import orderApi from '../../api/orderApi';
import payment_icon from '../../assets/img/payment_icon.png'

export default function Form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const merId = "EPAY000001"
    const encodeKey = 'rf8whwaejNhJiQG2bsFubSzccfRc/iRYyGUn6SPmT6y/L7A2XABbu9y4GvCoSTOTpvJykFi6b1G0crU8et2O0Q==';
    const [payOption, setPayOption] = useState("PAY_CREATE_TOKEN")
    const handleChangepayOption = (event) => {
        setPayOption(event.target.value);
    }

    const [goodsNm, setGoodsNm] = useState("Test");
    const handleChangegoodsNm = (event) => {
        setGoodsNm(event.target.value);
    }

    const [amount, setAmount] = useState("")
    const handleChangeAmout = (event) => {
        setAmount(event.target.value);
    };

    const [windowType, setwindowType] = useState("0")
    const handleChangeWindowType = (event) => {
        setwindowType(event.target.value);
    };

    const [des, setDes] = useState("abc")
    const handleChangeDes = (event) => {
        setDes(event.target.value);
    };


    const [currencyCode, setCurrencyCode] = useState('VND');


    const [payType, setPaytype] = useState('NO');

    const handleChangePaytype = (event) => {
        setPaytype(event.target.value);
    };

    const [language, setLanguage] = useState('VN');

    const handleChangeLanguage = (event) => {
        setLanguage(event.target.value);
    };
    const generateId = (prefix, timeStamp, length) => {
        const id = prefix + '_' + timeStamp + '_' + generateRandomString(length - prefix.length - timeStamp.length - 2);
        return id;
    };
    const generateRandomString = (length) => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        return result;
    }
    const generateMerchantToken = () => {
        return sha256(timeStamp + merTrxId + merId + amount + encodeKey);
    }

    const timeStamp = window.dateFormat(new Date(), "yyyymmddHHMMss");
    const merTrxId = generateId('MTRXID', timeStamp, 28);
    const merchantToken = generateMerchantToken();
    const invoiceNo = generateId('ordNo', timeStamp, 25);

    const handleSubmit = (e) => {
        e.preventDefault();
        // const timeStamp = window.dateFormat(new Date(), "yyyymmddHHMMss");
        // const merTrxId = generateId('MTRXID', timeStamp, 28);
        // const merchantToken = generateMerchantToken();
        // const invoiceNo = generateId('ordNo', timeStamp, 25);
        // const megapayForm = $('#megapayForm');
        // // console.log(megapayForm.serializeArray())
        const domain = 'https://sandbox.megapay.vn:2810/';
        window.openPayment(1, domain);
    }

    const id_app = "60939744ac969b4078488026";
    const api_code = "so1";
    const _Id = "62aff2b13257701b47989e28";
    const token = "flex.public.token"
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await orderApi.get(id_app, api_code, _Id, token);
                setData(res)
                window.scrollTo(0, 0)
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [])


    //auto sumit form
    const formRef = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            await setName(data.ten_kh)
            await setEmail(data.email)
            await setAmount(data.t_tt)
            await setDes(data.ten_pt_thanh_toan)
           formRef.current.click(handleSubmit);
        };
        fetchData();

    }, [data])



    return (
        <div className='payment__container'>
            <img className='payment__img' src={require('../../assets/img/payment_icon.png')} />
            <h1 className='payment__tiltle'>FORM PAYMENT</h1>
            <form className='container' id='megapayForm' name='megapayForm' method='POST' action='submit' onSubmit={() => handleSubmit}>
                <div className='form__group'>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <TextField fullWidth label="First name" readOnly inputProps={{ maxLength: 40 }} name="name" value={name} required />
                    </Box>
                </div>

                <div className='form__group'>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <TextField fullWidth label="Last name" inputProps={{ maxLength: 100 }} name="name" value={name} required />
                    </Box>
                </div>
                <div className='form__group'>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <TextField fullWidth label="Email" name="email" value={email} inputProps={{ maxLength: 100 }} required />
                    </Box>
                </div>
                <div className='form__group'>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <TextField fullWidth label="amount" name='amount' value={amount} readOnly inputProps={{ maxLength: 10 }} required />
                    </Box>
                </div>
                <input style={{ display: 'none' }} type="text" readOnly name="currency" defaultValue="VND" maxLength={3} />


                <div className='form__group'>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <TextField fullWidth label="goodsNm" placeholder='Nhập tên sản phẩm' value={goodsNm} name="goodsNm" onChange={handleChangegoodsNm} required />
                    </Box>
                </div>
                <div className='form__group'>
                    <FormControl>
                        <FormLabel id="payType">Phương thức thanh toán</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="NO"
                            name="payType"
                            onChange={handleChangePaytype}
                        >
                            <FormControlLabel value="IC" control={<Radio />} label="Thẻ tín dụng (Visa/master/JCB…)" />
                            <FormControlLabel value="DC" control={<Radio />} label="Thẻ ATM nội địa" />
                            <FormControlLabel value="VA" control={<Radio />} label="Chuyển khoản qua mã nộp tiền" />
                            <FormControlLabel value="EW" control={<Radio />} label="Ví điện tử (Zalopay, Momo, Moca)" />
                            <FormControlLabel value="IS" control={<Radio />} label="Thanh toán trả góp" />
                            <FormControlLabel value="QR" control={<Radio />} label="Thanh toán qua VNPAYQR" />
                            <FormControlLabel value="NO" control={<Radio />} label="Không chọn phương thức thanh toán" />

                        </RadioGroup>
                    </FormControl>
                </div>

                <div className='form__groupp'></div>
                <FormControl >
                    <InputLabel >windowType</InputLabel>
                    <Select
                        name="windowType"
                        value={windowType}
                        label="windowType"
                        onChange={handleChangeWindowType}
                    >
                        <MenuItem value={"0"}>Sử dụng máy tính</MenuItem>
                        <MenuItem value={"1"}>Sử dụng điện thoại</MenuItem>
                    </Select>
                </FormControl>

                <FormControl >
                    <InputLabel >Payoption</InputLabel>
                    <Select
                        name="payOption"
                        value={payOption}
                        label="payOption"
                        onChange={handleChangepayOption}
                    >
                        <MenuItem value={"PAY_CREATE_TOKEN"}> Thanh toán và tạo token</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    name="description"
                    label="description"
                    multiline
                    rows={4}
                    inputProps={{ maxLength: 100 }}
                    placeholder="Nhập mô tả"
                    value={des}
                    onChange={handleChangeDes}
                />

                <FormControl >
                    <InputLabel id="demo-simple-select-label">language</InputLabel>
                    <Select

                        value={language}
                        label="language"
                        onChange={handleChangeLanguage}
                    >
                        <MenuItem value={"VN"}>Tiếng Việt</MenuItem>
                        <MenuItem value={"EN"}>Tiếng Anh</MenuItem>
                        <MenuItem value={"KO"}>Tiếng Hàn</MenuItem>
                    </Select>
                </FormControl>

                <input type="hidden" value={timeStamp} name="timeStamp" />
                <input type="hidden" name="merId" value={merId} />
                <input type="hidden" name="merTrxId" defaultValue={merTrxId} />
                <input type="hidden" name="merchantToken" value={merchantToken} />
                <input type="hidden" name="invoiceNo" value={invoiceNo} />
                <input style={{ display: 'none' }} type="text" name="callBackUrl" defaultValue={'http://127.0.0.1:3000/result' }/>
                <input style={{ display: 'none' }} type="text" name="notiUrl" defaultValue="https://" />
                <input style={{ display: 'none' }} type="text" name="reqDomain" defaultValue="https://localhost" />
                <input type="hidden" name="userId" maxLength="50" value="trung"></input>

                <input style={{ display: 'none' }} type="text" name="windowColor" defaultValue="#00a0e9" />
                <input style={{ display: 'none' }} type="text" name="buyerPhone" />
                <input style={{ display: 'none' }} type="text" name="buyerAddr" />
                <input style={{ display: 'none' }} type="text" name="buyerCity" />
                <input style={{ display: 'none' }} type="text" name="buyerState" />
                <input style={{ display: 'none' }} type="text" name="buyerPostCd" />
                <input style={{ display: 'none' }} type="text" name="buyerCountry" />
                <input style={{ display: 'none' }} type="text" name="receiverLastNm" />
                <input style={{ display: 'none' }} type="text" name="receiverFirstNm" />
                <input style={{ display: 'none' }} type="text" name="receiverPhone" />
                <input style={{ display: 'none' }} type="text" name="receiverAddr" />
                <input style={{ display: 'none' }} type="text" name="receiverCity" />
                <input style={{ display: 'none' }} type="text" name="receiverState" />
                <input style={{ display: 'none' }} type="text" name="receiverPostCd" />
                <input style={{ display: 'none' }} type="text" name="receiverCountry" />
                <input style={{ display: 'none' }} type="text" name="fee" />
                <input style={{ display: 'none' }} type="text" name="vaStartDt" />
                <input style={{ display: 'none' }} type="text" name="vaEndDt" />
                <input style={{ display: 'none' }} type="text" name="vaCondition" />
                <input style={{ display: 'none' }} type="text" name="bankCode" />
                <input style={{ display: 'none' }} type="text" name="subappid" />
            </form >
            <button ref={formRef} type='submit' onClick={handleSubmit} className='form__btn '>Checkout</button>
        </div>
    );
}