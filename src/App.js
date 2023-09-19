import './App.css';
import { Component } from 'react';

import { Settings } from './utils/constants';

class App extends Component {
    
	/*optional*/
	constructor() {
		super();
        this.state = {
            conversionTypes: [],
            convertedValue: ''
        };
	}

    FromValue = null;
    SelectedType = null;

    componentDidMount() {
        fetch(Settings.UNIT_CONVERSION_ENDPOINT + 'api/unitconversions/gettypes')
        .then(conversionsData => conversionsData.json())
        .then(types => this.setState(() => 
                                        {
                                            return ({conversionTypes: types});
                                        }));
    }

    Convert(type, value) {
        const data = {ValueFrom: value, ConversionType: type};
        fetch(Settings.UNIT_CONVERSION_ENDPOINT + 'api/unitconversions/convert',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
        .then(result => result.json())
        .then(value => this.setState(() => 
                                        {
                                            return ({convertedValue: value});
                                        }));
    }
    
    render () {
        return (
            <div className='app-frame'>
                <div className='editor-label'>
                    Value to convert:
                </div>
                <div className='editor-field'>
                    <input 
                        type = 'number' 
                        className = 'form-input' 
                        onChange = {(event) => this.FromValue = event.target.value}
                    />
                </div>

                <br/>

                <div className='editor-label'>
                    Select conversion type
                </div>
                <div className='editor-field'>
                    <select className = 'form-input' onChange = {(event) => this.SelectedType = event.target.value}>
                        <option></option>
                        {this.state.conversionTypes.map((type) => {
                            return (
                                <option value = {type.conversionType} key = {type.conversionType}>{type.conversionName}</option>
                            );
                        })}
                    </select>
                </div>

                <br/>

                <p>
                    <input 
                        type = 'button' 
                        value = 'Convert' 
                        className = 'form-input form-button'
                        onClick = {() => this.Convert(Number(this.SelectedType), Number(this.FromValue))}
                    />
                </p>

                <div className = 'editor-label'>
                    Converted value:
                </div>
                <div className = 'editor-field'>
                    <input 
                        type = 'number' 
                        className = 'form-input' 
                        disabled = {true}
                        value = {this.state.convertedValue}
                    />
                </div>
            </div>
        );
    }
}

export default App;
