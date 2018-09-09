import React, {Component} from 'react'

class FormComponent extends Component {
    render(){
        return(
            <div className='Form'>
                <form onSubmit={this.props.handleSubmit}>
                    <input type='text' name='city'/>
                    <input type="text" name='country'/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
    

}
    
    


export default FormComponent;