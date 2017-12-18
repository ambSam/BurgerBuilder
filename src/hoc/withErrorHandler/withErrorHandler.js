import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';


const withErrorHandler = (WrappedComponent,axios) => {
    return(props) => {
        return class extends Component {
            state = {
                error: null
            }
            componentDidMount() {
                axios.interceptors.response.use(res=>res,error=>{
                    this.setState({
                        error: error
                    })
                })
                axios.interceptors.request.use(req=>{
                    this.setState({
                        error: null
                    })
                    return req;
                })
            }
            errorConfirmedHandler()
            {
                this.setState({error: null})
            }
            render()
            {
                return(
                    <Aux>
                        <Modal show={this.state.error}
                               modalClosed={this.state.errorConfirmedHandler}>
                        </Modal>
                        <WrappedComponent {...props}/>
                    </Aux>
                )
            }
        }
    }
}

export default withErrorHandler;