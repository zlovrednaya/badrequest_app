import React, { useEffect, useState } from "react";
import { useAuth } from "../../../auth/useAuth";
import { useNavigate } from "react-router-dom";

import { CiLogout } from "react-icons/ci";
import { PiKeyReturnLight } from "react-icons/pi";
import { MdSave } from "react-icons/md";
import { IoSyncCircle } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { IoIosWarning } from "react-icons/io";

import InfoBox from "../../../components/elements/InfoBox";

import '../ChoresTrackerForm.css';
import './UserProfile.css';

export default function UserProfile() {
    const {user, logout, updateUser} = useAuth();
    const navigate = useNavigate();

    const [formStatus, setFormStatus] = useState(null);
    const [telegramSyncStatus, setTelegramSyncStatus] = useState('');
    const [formData, setFormData] = useState({
            email: user.email,
            name: user.name,
            phone: user?.phone,
            telegram_name: user?.telegram_name,
    });

    const infoMessage = "<p>For correct usage you need to find <b>@WidgetFactoryBot</b> in telegram and send the message: <br> \"<i>/start your_e-mail</i>\"</p>";
    

    function handleLogout() {
        logout();
        navigate("/");
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSave() {
        await axios('/user/save', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
            data: JSON.stringify(formData),
        })
        .then((res) => {
            setFormStatus({
                success: true,
                message: 'User data successfully saved!'
            });

            updateUser();
        })
         .catch(err => {
            console.log(err);
            let errors = err.response.data.errors;
            let errorText = err.response.data.message;

            setFormStatus({
                success: false,
                message: 'Something went wrong!'
            });
        });
    }

    const syncTelegramName = async () => {
        setTelegramSyncStatus('load');
        await axios('/user/syncTelegram', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
            data: JSON.stringify({telegram_name:formData.telegram_name}),
        })
        .then((res) => {
            if(res?.data?.success) {
                setTelegramSyncStatus('success');
            } else {
                setTelegramSyncStatus('error');
            }
            
        })
         .catch(err => {
            setTelegramSyncStatus('error');
            console.log(err);
            let errors = err.response.data.errors;
            let errorText = err.response.data.message;

            setFormStatus({
                success: false,
                message: 'Something went wrong!'
            });
        });
    };

    useEffect(() => {
        if (!user) return;
    }, [user]);

    return (
        <div className="chores-tracker-account user-profile-form">
            <div className="app-form">
                <div className="header-menu">
                    <h1 className="app-name" onClick={()=>navigate('/account')}>Chores</h1>
                </div>
                <div className="chores-tracker-window">
                    <div className="user-profile-window">
                        <div>
                            <div className="hello-user">Hello, {user.name}!</div>
                            <div className="user-profile-data">
                                <div className="user-profile-data-item username">
                                    <div className="user-profile-data-label">Username</div>
                                    <input 
                                        defaultValue={user.name} 
                                        onChange={handleChange}
                                        name="name"
                                    ></input>
                                </div>
                                <div className="user-profile-data-item password">
                                    <div className="user-profile-data-label">Password</div>
                                    <input type="password" defaultValue={user.password}></input>
                                </div>
                                <div className="user-profile-data-item email">
                                    <div className="user-profile-data-label">E-mail</div>
                                    <input 
                                        defaultValue={user.email} 
                                        onChange={handleChange}
                                        name="email"
                                    ></input>
                                </div>
                                <div className="user-profile-data-item phone">
                                    <div className="user-profile-data-label">Phone</div>
                                    <input 
                                        defaultValue={user.phone} 
                                        onChange={handleChange}
                                        name="phone"
                                    ></input>
                                </div>
                                <div className="user-profile-data-item telegram-name">
                                    <div className="user-profile-data-label">Telegram username</div>
                                    <input 
                                        defaultValue={user.telegram_name} 
                                        onChange={handleChange}
                                        name="telegram_name"
                                    >
                                    </input>
                                    <div className="user-profile-data-sync" onClick={()=> syncTelegramName()}>
                                        <IoSyncCircle />
                                        {telegramSyncStatus === 'success' && <IoIosCheckmarkCircle />} 
                                        {telegramSyncStatus === 'error' && <div> <IoIosWarning /> </div>}
                                    </div>
                                    <InfoBox infoMessage={infoMessage}/>
                                </div>
                            </div>
                        </div>
                        {formStatus && (
                            <div className="user-profile-status">
                                <div className={`user-profile-status-message ${formStatus.success=== true ? "status-success": "status-error"}`}>
                                    {formStatus.message}
                                </div>
                            </div>
                        )}
                        
                        <div className="user-profile-form-save">
                            <div className="user-profile-button user-profile-button-return" onClick={()=>navigate('/')}>
                                <PiKeyReturnLight />
                                <div>Back to chores</div>
                            </div>
                            <div className="user-profile-button user-profile-button-save" onClick={()=>handleSave()}>
                                <MdSave />
                                <div>Save</div>
                            </div>
                        </div>
                        <div className="user-profile-action-buttons">
                            
                            <div className="user-profile-button user-profile-logout" onClick={()=>handleLogout()}>
                                <CiLogout />
                                <div>Log out</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}