"use client"
import axios from "axios"
import React, { Component } from "react"

interface PythonState {
  message: string;
}

export default class Python extends Component<{}, PythonState> {
  private httpValues = { root: "http://127.0.0.1:8000/api/hello" }

  constructor(props: {}) {
    super(props)
    this.state = { message: "" } // inicializa state
  }

  async componentDidMount() {
    // Faz a requisição quando o componente é montado
    try {
      const res = await axios.get(this.httpValues.root)
      this.setState({ message: res.data.message }) // atualiza state
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div>
        <h1>Mensagem do Python:</h1>
        <p>{this.state.message}</p>
      </div>
    )
  }
}
