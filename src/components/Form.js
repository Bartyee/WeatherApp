import React, {Component} from 'react'
import classes from '../style/Form.css'

class FormComponent extends Component {
    render(){
        return(
            <div className='form'>
                <form onSubmit={this.props.handleSubmit}>
                    <input placeholder='City' class="form-control" type='text' name='city'/>
                    <input placeholder='Country' class="form-control" type="text" name='country'/>
                    <button type="submit" class="btn btn-primary btn-lg btn-submit-bootstrap">Submit</button>
                </form>
            </div>
        )
    }
    

}
    
    


export default FormComponent;