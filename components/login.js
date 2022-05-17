import React from 'react';
import {
  MDBContainer,
  MDBNavbarToggler,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBMask,
  MDBInput,
  MDBIcon,
  MDBView,
  MDBBtn,
  MDBCardTitle,
  MDBFooter
} from 'mdbreact';
import LoginStyle from '../styles/loginstyles';
import axios from 'axios';
import Loader from './loader';

class Login extends React.Component {
  state = {
    showpassword: false,
    isLoaded: true,
    invalidMsg: false,
    collapseID: '',
    email:'',
    password:'',
    username:'',
    fpassword:'',
    cnfpassword:'',
    accesscode:'',
    vemail:'',
    showVerifyMail: false,
    showfpassword: false,
    showcnfpassword: false,
    showLogin: true,
    loginSubmitted: false,
    verifyEmailSubmitted: false,
    emailinvalid: false,
    caremanagerId: '',
    showVemailError: false,
    careManagerFirstname: '',
    role: ""
  };

  componentDidUpdate() {
    localStorage.setItem('twilioidentity', this.state.twilioidentity);
    localStorage.setItem('caremanagerId', this.state.caremanagerId);
    localStorage.setItem('careManagerFirstname', this.state.careManagerFirstname);
    localStorage.setItem('careManagerLastname', this.state.careManagerLastname);
    localStorage.setItem('role', this.state.role);
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value, verifyEmailSubmitted: false, loginSubmitted: false });
    
  };

  togglePassword = () => {
    this.setState({ showpassword : !this.state.showpassword})
  }

  ftogglePassword = () => {
    this.setState({ showfpassword : !this.state.showfpassword})
  }

  cftogglePassword = () => {
    this.setState({ showcnfpassword : !this.state.showcnfpassword})
  }

  handleLogin = () => {
    this.setState({
      isLoaded: false,
      loginSubmitted: true
    });
    let obj = {
      email: this.state.email,
      password: this.state.password
    }

    axios({
      method: 'POST',
      url: `/api/login`,
      data: obj,
      })
      .then((response) => {
         let loginresponse = response && response.data && response.data.json;
        this.setState({
          twilioidentity: loginresponse.twilio_details && loginresponse.twilio_details.identity,
          caremanagerId: loginresponse.user_details.email,
          careManagerFirstname: loginresponse.user_details.firstname,
          careManagerLastname: loginresponse.user_details.lastname,
          role: loginresponse.user_details.role,
          invalidMsg: loginresponse.user_details.role !== "PATIENT" ? false : true,
          isLoaded: true
        }, ()=>{
           if(this.state.invalidMsg == false){
             window.location.href="/dashboard"
          }
        });
      })
      .catch((response) => { 
        this.setState({ invalidMsg: true, isLoaded: true })
        
      });


  }

  handleForgotPass = () => {
    this.setState({ showLogin: false, showVerifyMail: true })
  }

  submitForgotPass = () => {
    this.setState({
      showLogin: false, 
      showVerifyMail: true,
      showVemailError: false
    })
  }
  handleVerifyLogin = () => {

    if(!this.state.vemail.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)){
      this.setState({
          emailinvalid: true,
          verifyEmailSubmitted: true
      });
    }else {
      this.setState({isLoaded: false})
      let obj = {
        email: this.state.vemail
      }
      axios({
        method: 'POST',
        url: `/api/forgetpassword`,
        data: obj,
      })
      .then((response) => {
        let forgetresponse = response && response.data && response.data.json;
        console.log(forgetresponse)
         this.setState({
          isLoaded: true, showVemailError: true, emailinvalid: false, verifyEmailSubmitted: true, forgetresponse: forgetresponse
        });
     })
     .catch((response) => { 
       this.setState({ invalidMsg: true, isLoaded: true })
      });
    }

    
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  render() {
    console.log("New Version")
    return (
      <div className="login-container">
        <MDBContainer>
              <MDBRow>
                <MDBCol md='12' lg='6' xl='5' sm='12'  style={{ height: '95vh' }} fluid className='mx-auto'>
                  <MDBCard className="login-card">
                    <MDBCardBody>
                      <MDBCardTitle className='text-center login-logo'><img src="/images/careassistant_original.svg" alt="Logo" /></MDBCardTitle>
                      {this.state.showVemailError && this.state.showVerifyMail && <div className='valid-msg'>Verification link has been sent to your email</div>}
                      {this.state.showLogin &&
                      <>
                      <MDBInput
                        type='email'
                        label='Email'
                        name='email'
                        value={this.state.email}
                        className={`iconcolor ${((!this.state.email && this.state.loginSubmitted) || (this.state.invalidMsg && this.state.email && this.state.loginSubmitted)) ? "is-invalid" : ""}`}
                        onChange={this.changeHandler}
                        icon='user-alt'
                        
                      >
                        {(!this.state.email  && this.state.loginSubmitted) && 
                        <div className="invalid-feedback" style={{marginLeft: "42px"}}>
                          Email is required.
                        </div>}
                        {this.state.invalidMsg && this.state.email && this.state.loginSubmitted &&
                        <div className="invalid-feedback" style={{marginLeft: "42px"}}>
                        Invalid Email or Password.
                        </div>}
                        </MDBInput>

                        

                      <div className="password-container">
                      <MDBInput
                        type={!this.state.showpassword ? 'password' : 'text'}
                        label='Password'
                        name='password'
                        className={`iconcolor ${(!this.state.password && this.state.loginSubmitted) ? "is-invalid" : ""}`}
                        value={this.state.password}
                        onChange={this.changeHandler}
                        icon='lock'
                        
                      >
                       {this.state.showpassword ?
                      <MDBIcon far icon="eye" className={`password-icon ${(!this.state.password && this.state.loginSubmitted) && 'invalid' }`} onClick={this.togglePassword}/>:
                       <MDBIcon far icon="eye-slash" className={`password-icon ${(!this.state.password && this.state.loginSubmitted) && 'invalid' }`} onClick={this.togglePassword}/>
                      }
                      {(!this.state.password && this.state.loginSubmitted) &&
                      <div className="invalid-feedback" style={{marginLeft: "42px"}}>
                          Password is required.
                        </div>
                       }
                      </MDBInput>
                       </div>
                      <div className='text-center mt-3 black-text'>
                        <MDBBtn className='signin-btn' size='sm' onClick={this.handleLogin}>Login</MDBBtn>
                        
                      </div>
                      <div className='inline-ul text-center d-flex justify-content-center'>
                        <span className="forgot-text" onClick={this.handleForgotPass}><u>Forgot Password? </u></span>
                      </div>
                      </>
                      }

                 


                      {this.state.showVerifyMail && 
                      <>
                      <MDBInput
                        type='email'
                        label='Email'
                        name='vemail'
                        className={`iconcolor ${((!this.state.vemail && this.state.verifyEmailSubmitted) || this.state.emailinvalid) ? "is-invalid" : ""}`}
                        value={this.state.vemail}
                        onChange={this.changeHandler}
                        icon='user-alt'
                        outline
                      >
                        {(this.state.emailinvalid && !this.state.vemail && this.state.verifyEmailSubmitted) &&
                      <div className="invalid-feedback" style={{marginLeft: "42px"}}>
                          Email is required.
                        </div>
                       }
                       {(this.state.vemail && this.state.emailinvalid && this.state.verifyEmailSubmitted) &&
                      <div className="invalid-feedback" style={{fontSize: "16px", marginLeft: "42px"}}>
                          The email address you entered isn't linked to a careassistant.ai account.
                        </div>
                       }
                        </MDBInput>
                      
                      <div className='text-center mt-3 black-text'>
                      {(this.state.showVemailError && this.state.showVerifyMail) ?
                        <MDBBtn className='signin-btn' size='lg' onClick={this.handleVerifyLogin}>
                          Resend Verification Link
                        </MDBBtn>
                        :
                        <MDBBtn className='signin-btn' size='sm' onClick={this.handleVerifyLogin}>
                          Send Link
                        </MDBBtn>
                      }
                      </div>
                      
                      </>
                      
                      }


                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
             <MDBFooter className='font-small py-2 footer-copyright text-center versionClass'>
              <MDBContainer fluid style={{color: "#424242", fontSize:"14px"}}>
                Version : 3.1
              </MDBContainer>
            </MDBFooter>
            </MDBContainer>
            {!this.state.isLoaded && <Loader /> }
            <style jsx>{LoginStyle}</style>
      </div>
    );
  }
}

export default Login;
