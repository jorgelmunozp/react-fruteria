import logo from './logo.png';
import './App.css';

import React from 'react';

let user = 'user';
let fecha = new Date();                     //Lee la fecha actual del sistema

let frutas = {  "manzanas": {
                  "nombre": "Manzanas",
                  "precio": 4200
                },
                "bananos": {
                  "nombre": "Bananos",
                  "precio": 2200
                },
                "mangos": {
                  "nombre": "Mangos",
                  "precio": 3500
                },
                "fresas": {
                  "nombre": "Fresas",
                  "precio": 2700
                }
              }; 

const formatterPeso = new Intl.NumberFormat('es-CO', {   //Formato moneda $ pesos Colmbianos
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0
});

const formatterMiles = new Intl.NumberFormat('es-CO', {   //Formato miles para cantidades
  style: 'decimal',
  minimumFractionDigits: 0
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      cantidadManzanas: 0, subtotalManzanas:0, descuentoManzanas:0, valordescuentoManzanas:0, totalManzanas:0,
      cantidadBananos: 0, subtotalBananos:0, descuentoBananos:0, valordescuentoBananos:0, totalBananos:0,
      cantidadMangos: 0, subtotalMangos:0, descuentoMangos:0, valordescuentoMangos:0, totalMangos:0,
      cantidadFresas: 0, subtotalFresas:0, descuentoFresas:0, valordescuentoFresas:0, totalFresas:0,
      cantidadTotal: 0, subtotalTotal:0, valordescuentoTotal:0, totalAPagar: 0
    };
    this.handleChangeCantidadManzanas = this.handleChangeCantidadManzanas.bind(this);
    this.handleChangeCantidadBananos = this.handleChangeCantidadBananos.bind(this);
    this.handleChangeCantidadMangos = this.handleChangeCantidadMangos.bind(this);
    this.handleChangeCantidadFresas = this.handleChangeCantidadFresas.bind(this);
    this.handleChangeDescuentoManzanas = this.handleChangeDescuentoManzanas.bind(this);
    this.handleChangeDescuentoBananos = this.handleChangeDescuentoBananos.bind(this);
    this.handleChangeDescuentoMangos = this.handleChangeDescuentoMangos.bind(this);
    this.handleChangeDescuentoFresas = this.handleChangeDescuentoFresas.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  tick() {
    this.setState(state => ({
      subtotalManzanas: this.state.cantidadManzanas * frutas.manzanas.precio,
      subtotalBananos: this.state.cantidadBananos * frutas.bananos.precio,
      subtotalMangos: this.state.cantidadMangos * frutas.mangos.precio,
      subtotalFresas: this.state.cantidadFresas * frutas.fresas.precio,
      valordescuentoManzanas: this.state.subtotalManzanas * this.state.descuentoManzanas/100,
      valordescuentoBananos: this.state.subtotalBananos * this.state.descuentoBananos/100,
      valordescuentoMangos: this.state.subtotalMangos * this.state.descuentoMangos/100,
      valordescuentoFresas: this.state.subtotalFresas * this.state.descuentoFresas/100,      
      totalManzanas: this.state.subtotalManzanas - this.state.valordescuentoManzanas,
      totalBananos: this.state.subtotalBananos - this.state.valordescuentoBananos,
      totalMangos: this.state.subtotalMangos - this.state.valordescuentoMangos,
      totalFresas: this.state.subtotalFresas - this.state.valordescuentoFresas,
      cantidadTotal: formatterMiles.format(+this.state.cantidadManzanas + +this.state.cantidadBananos + +this.state.cantidadMangos + +this.state.cantidadFresas),
      subtotalTotal: +this.state.subtotalManzanas + +this.state.subtotalBananos + +this.state.subtotalMangos + +this.state.subtotalFresas,
      valordescuentoTotal: +this.state.valordescuentoManzanas + +this.state.valordescuentoBananos + +this.state.valordescuentoMangos + +this.state.valordescuentoFresas,
      totalAPagar : this.state.totalManzanas + this.state.totalBananos + this.state.totalMangos + this.state.totalFresas,
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 0);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <table>
              <tbody>
                <tr>
                  <td><a href="/"><img src={logo} className="App-logo" alt="logo" /></a></td>
                  <td>&nbsp;</td>
                  <td><a href="/"><h1 className="App-title">Frutería Store</h1></a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </header> 
        <body className="App-body">
          <div className='App-info'>
            <table>
              <tbody>
                <tr>
                  <td><p id="fecha">Fecha {fecha.toLocaleDateString()}</p></td>
                  <td><h1>Facturación</h1></td>
                  <td>
                    <p id="userPerfil">
                        hola {user}
                        <img id="fotoPerfil" src="profile.png" alt=' '/>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
              <table border="3">
                <tbody>
                  <tr>
                      <th colSpan={3}>Total a pagar</th>
                      <th colSpan={3}><input id="valorTotal" value={formatterPeso.format(this.state.totalAPagar)} 
                                            type="text" name="totalCompra" placeholder=" Total a pagar" autoComplete="off" disabled="disabled" /></th>
                      <th colSpan={2}><form onSubmit={this.handleSubmit}>
                                        <input type="submit" value="Reiniciar" name="botones" id="cancelar" />
                                        </form></th>             
                  </tr>
                  <tr>
                      <th colSpan={2} rowSpan={2}>Fruta</th>
                      <th rowSpan={2}>Precio</th>
                      <th rowSpan={2}>Kilos</th>
                      <th rowSpan={2}>Subtotal</th>
                      <th colSpan={2}>Descuento</th>
                      <th rowSpan={2}>Total</th>
                  </tr>
                  <tr>
                      <th>Porcentaje</th>
                      <th>Valor</th>
                  </tr>
                  <tr>
                      <td><img id="fruta1" src="images/manzana.png" /></td>
                      <td className='nameFruit1'><p>M</p></td>
                      <td><p>{formatterPeso.format(frutas.manzanas.precio)}</p></td>
                      <td><input id="cantidadManzanas" type="number" onChange={this.handleChangeCantidadManzanas} 
                                value={this.state.cantidadManzanas} autoComplete='off' min={0} /></td>
                      <td><p>{formatterPeso.format(this.state.subtotalManzanas)}</p></td>
                      <td><input id="descuentoManzanas" type="number" onChange={this.handleChangeDescuentoManzanas} 
                                value={this.state.descuentoManzanas} autoComplete='off' min={0} max={100} /></td>
                      <td><p>{formatterPeso.format(this.state.valordescuentoManzanas)}</p></td>
                      <td><p>{formatterPeso.format(this.state.totalManzanas)}</p></td>       
                  </tr>
                  <tr>
                      <td><img id="fruta2" src="images/banano.png" /></td>
                      <td className='nameFruit2'><p>B</p></td>
                      <td><p>{formatterPeso.format(frutas.bananos.precio)}</p></td>
                      <td><input id="Bananos" type="number" onChange={this.handleChangeCantidadBananos}
                                value={this.state.cantidadBananos} autoComplete='off' min={0}/></td>
                      <td><p>{formatterPeso.format(this.state.subtotalBananos)}</p></td>
                      <td><input id="descuentoBananos" type="number" onChange={this.handleChangeDescuentoBananos} 
                                value={this.state.descuentoBananos} autoComplete='off' min={0} max={100} /></td>
                      <td><p>{formatterPeso.format(this.state.valordescuentoBananos)}</p></td>
                      <td><p>{formatterPeso.format(this.state.totalBananos)}</p></td>
                  </tr>
                  <tr>
                      <td><img id="fruta3" src="images/mango.png" /></td>
                      <td className='nameFruit3'><p>M</p></td>
                      <td><p>{formatterPeso.format(frutas.mangos.precio)}</p></td>
                      <td><input id="Mangos" type="number" onChange={this.handleChangeCantidadMangos}
                                value={this.state.cantidadMangos} autoComplete='off' min={0}/></td>
                      <td><p>{formatterPeso.format(this.state.subtotalMangos)}</p></td>
                      <td><input id="descuentoMangos" type="number" onChange={this.handleChangeDescuentoMangos} 
                                value={this.state.descuentoMangos} autoComplete='off' min={0} max={100} /></td>
                      <td><p>{formatterPeso.format(this.state.valordescuentoMangos)}</p></td>
                      <td><p>{formatterPeso.format(this.state.totalMangos)}</p></td>          
                  </tr>
                  <tr>
                      <td><img id="fruta4" src="images/fresa.png" /></td>
                      <td className='nameFruit4'><p>F</p></td>
                      <td><p>{formatterPeso.format(frutas.fresas.precio)}</p></td>
                      <td><input id="Fresas" type="number" onChange={this.handleChangeCantidadFresas}
                                value={this.state.cantidadFresas} autoComplete='off' min={0} /></td>
                      <td><p>{formatterPeso.format(this.state.subtotalFresas)}</p></td>
                      <td><input id="descuentoFresas" type="number" onChange={this.handleChangeDescuentoFresas} 
                                value={this.state.descuentoFresas} autoComplete='off' min={0} max={100} /></td>
                      <td><p>{formatterPeso.format(this.state.valordescuentoFresas)}</p></td>
                      <td><p>{formatterPeso.format(this.state.totalFresas)}</p></td>          
                  </tr>
                  <tr id="valoresTotales">
                      <td colSpan={3}>Totales</td>
                      <td>{this.state.cantidadTotal}</td>
                      <td>{formatterPeso.format(this.state.subtotalTotal)}</td>
                      <td colSpan={2}>{formatterPeso.format(this.state.valordescuentoTotal)}</td>
                      <td>{formatterPeso.format(this.state.totalAPagar)}</td>
                  </tr>
                </tbody>
              </table>
          </div>
        </body>
      </div>
    );
  }
  handleChangeCantidadManzanas(e) {
    this.setState({ 
      cantidadManzanas: e.target.value
    });
  }
  handleChangeCantidadBananos(e) {
    this.setState({ 
      cantidadBananos: e.target.value
    });
  }
  handleChangeCantidadMangos(e) {
    this.setState({ 
      cantidadMangos: e.target.value
    });
  }
  handleChangeCantidadFresas(e) {
    this.setState({ 
      cantidadFresas: e.target.value
    });
  }
  handleChangeDescuentoManzanas(e) {
    this.setState({ 
      descuentoManzanas: e.target.value
    });
  }
  handleChangeDescuentoBananos(e) {
    this.setState({ 
      descuentoBananos: e.target.value
    });
  }
  handleChangeDescuentoMangos(e) {
    this.setState({ 
      descuentoMangos: e.target.value
    });
  }
  handleChangeDescuentoFresas(e) {
    this.setState({ 
      descuentoFresas: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.cantidadManzanas.length === 0) {
      return;
    }
    if (this.state.cantidadBananos.length === 0) {
      return;
    }
    if (this.state.cantidadMangos.length === 0) {
      return;
    }
    if (this.state.cantidadFresas.length === 0) {
      return;
    }
    if (this.state.descuentoManzanas.length === 0) {
      return;
    }
    if (this.state.descuentoBananos.length === 0) {
      return;
    }
    if (this.state.descuentoMangos.length === 0) {
      return;
    }
    if (this.state.descuentoFresas.length === 0) {
      return;
    }
    this.setState(state => ({
      cantidadManzanas: 0,
      cantidadBananos: 0,
      cantidadMangos: 0,
      cantidadFresas: 0,
      descuentoManzanas: 0,
      descuentoBananos: 0,
      descuentoMangos: 0,
      descuentoFresas: 0
    }));
  }
}



export default App;
