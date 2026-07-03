import { Component } from "react";

export class Autolote extends Component {
  CodAuto;
  Placa;
  Marca;
  Tipo;
  Color;
  Año;
  Precio;

  constructor(props) {
    super(props);
    this.CodAuto = "cod";
    this.Placa = "p";
    this.Marca = "m";
    this.Tipo = "t";
    this.Color = "c";
    this.Año = 0;
    this.Precio = 0;
  } //termina el constructor

  GuardarRegistro(cod, placa, marca, tipo, color, año, precio) {
    this.CodAuto = cod;
    this.Placa = placa;
    this.Marca = marca;
    this.Tipo = tipo;
    this.Color = color;
    this.Año = año;
    this.Precio = precio;
  } //termina el metodo GuardarRegistro

  ImprimeRegistro() {
    return (
      <table>
        <thead>
          <tr>
            <th>CodAuto</th>
            <th>Placa</th>
            <th>Marca</th>
            <th>Tipo</th>
            <th>Color</th>
            <th>Año</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.CodAuto}</td>
            <td>{this.Placa}</td>
            <td>{this.Marca}</td>
            <td>{this.Tipo}</td>
            <td>{this.Color}</td>
            <td>{this.Año}</td>
            <td>{this.Precio}</td>
          </tr>
        </tbody>
      </table>
    );
  }
} //termina la clase
