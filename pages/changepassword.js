import React from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBBtn,
    MDBCardTitle
} from 'mdbreact';
import LoginStyle from '../styles/loginstyles';
import Head from 'next/head'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

class ChangePassword extends React.Component {
    state = {
        email: '',
        password: '',
        username: '',
        fpassword: '',
        cnfpassword: '',
        accesscode: '',
        vemail: '',
        showVerifyMail: false,
        showfpassword: false,
        showcnfpassword: false,
        passwordsinvalid: false, 
        passwordChanged: false,
        passwordSubmitted: false,
        validForm: false
    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });

    };

    ftogglePassword = () => {
        this.setState({ showfpassword: !this.state.showfpassword })
    }

    cftogglePassword = () => {
        this.setState({ showcnfpassword: !this.state.showcnfpassword })
    }

    submitForgotPass = () => {
        if(this.state.fpassword != this.state.cnfpassword){
            this.setState({
                passwordsinvalid: true,
                passwordSubmitted: true
            }, ()=>{
                this.setState({
                    passwordChanged:  true
                });
            })
        }else{
            this.setState({
                passwordsinvalid: false,
                passwordSubmitted: true
            }, ()=>{
                this.setState({
                    passwordChanged:  true
                });
            })
        }
        
       if(this.state.username  && this.state.fpassword && this.state.cnfpassword && this.state.accesscode){
        this.setState({ validForm: true})
       }else{
        this.setState({ validForm: false})  
       }
    }
    
    Login = () => {
        window.location.href="/"
    }




    render() {
        return (
            <React.Fragment>
            <Head>
                <title>Healthlligence</title>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
            </Head>
                <div className="login-container">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md='12' lg='6' xl='5' sm='12' style={{ height: '100vh' }} fluid className='mx-auto'>
                                <MDBCard className="login-card">
                                    <MDBCardBody>
                                        <MDBCardTitle className='text-center login-logo'><img src="/images/careassistant_logo.svg" alt="Logo" /></MDBCardTitle>

                                        {
                                            this.state.validForm && this.state.passwordChanged ? <div>
                                                <div className='passwordchanged'>Password successfully changed.</div>
                                                <div className='text-center mt-3 black-text'>
                                                    <MDBBtn className='signin-btn proceedtologin' size='sm' onClick={this.Login}> Proceed to Login  </MDBBtn>

                                                </div>
                                            </div> : <div>
                                            <div className='invalid-msg'>Enter New Password.</div>
                                            <div className='password-validation-style'>Please enter a new password with at least 8 characters, at least 1 number and at least 1 special character.</div>
                                        {/* {this.state.passwordsinvalid ? <div className='invalid-msg'>Password do not match, please try again.</div> : <div className='invalid-msg'>Enter New Password</div>} */}
                                        <>
                                            <MDBInput
                                                type='text'
                                                label='Username'
                                                name='username'
                                                className={`iconcolor ${(!this.state.username && this.state.passwordSubmitted) ? "is-invalid" : ""}`}
                                                value={this.state.username}
                                                onChange={this.changeHandler}
                                                icon='user-alt'
                                                outline
                                            >
                                                {(!this.state.username && this.state.passwordSubmitted) && 
                                                    <div className="invalid-feedback">
                                                    Username is required.
                                                    </div>}
                                                </MDBInput>
                                            <div className="password-container">
                                                <MDBInput
                                                    type={!this.state.showfpassword ? 'password' : 'text'}
                                                    label='Password'
                                                    name='fpassword'
                                                    className={`iconcolor ${(!this.state.fpassword && this.state.passwordSubmitted) ? "is-invalid" : ""}`}
                                                    value={this.state.fpassword}
                                                    onChange={this.changeHandler}
                                                    icon='lock'
                                                    outline
                                                >
                                                {this.state.showfpassword ?
                                                    <MDBIcon far icon="eye" className="password-icon" onClick={this.ftogglePassword} /> :
                                                    <MDBIcon far icon="eye-slash" className="password-icon" onClick={this.ftogglePassword} />
                                                }
                                                {(!this.state.fpassword && this.state.passwordSubmitted) && 
                                                    <div className="invalid-feedback">
                                                    Password is required.
                                                    </div>}
                                                </MDBInput>
                                            </div>
                                            <div className="password-container">
                                                <MDBInput
                                                    type={!this.state.showcnfpassword ? 'password' : 'text'}
                                                    label='Confirm Password'
                                                    name='cnfpassword'
                                                    className={`iconcolor ${(!this.state.cnfpassword && this.state.passwordSubmitted) ? "is-invalid" : ""}`}
                                                    value={this.state.cnfpassword}
                                                    onChange={this.changeHandler}
                                                    icon='lock'
                                                    outline
                                                >
                                                {this.state.showcnfpassword ?
                                                    <MDBIcon far icon="eye" className="password-icon" onClick={this.cftogglePassword} /> :
                                                    <MDBIcon far icon="eye-slash" className="password-icon" onClick={this.cftogglePassword} />
                                                }
                                                {(!this.state.cnfpassword && this.state.passwordSubmitted && !this.state.passwordsinvalid) && 
                                                    <div className="invalid-feedback">
                                                    Confirm password is required.
                                                    </div>}

                                                    {this.state.passwordsinvalid && 
                                                    <div className="invalid-feedback">
                                                    Password do not match, please try again.
                                                    </div>}
                                                </MDBInput>
                                            </div>
                                            <MDBInput
                                                type='text'
                                                label='Access Code'
                                                name='accesscode'
                                                className={`iconcolor ${(!this.state.accesscode && this.state.passwordSubmitted) ? "is-invalid" : ""}`}
                                                value={this.state.accesscode}
                                                onChange={this.changeHandler}
                                                icon='key'
                                                outline
                                            >
                                                {(!this.state.accesscode && this.state.passwordSubmitted) && 
                                                    <div className="invalid-feedback">
                                                    Access code is required.
                                                    </div>}
                                                </MDBInput>
                                            <div className='text-center mt-3 black-text'>
                                                <MDBBtn className='signin-btn' size='sm' onClick={this.submitForgotPass}> Confirm Change Password  </MDBBtn>

                                            </div>
                                            
                                        </>
                                        </div>
                                 }
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <style jsx>{LoginStyle}</style>
                </div>
            </React.Fragment>
        );
    }
}

export default ChangePassword;
