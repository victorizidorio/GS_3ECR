class Desp {
    constructor(ano, mes, dia, tipo, descricao, valor) {
      this.ano = ano;
      this.mes = mes;
      this.dia = dia;
      this.tipo = tipo;
      this.descricao = descricao;
      this.valor = valor;
    }
  
    validarDados() {
      for (let i in this) {
        if (this[i] == undefined || this[i] == '' || this[i] == null) {
          return false;
        }
      }
      return true;
    }
  }
  
  class Db {
    constructor() {
      let id = localStorage.getItem('id');
      if (id === null) localStorage.setItem('id', 0);
    }
  
    getProximoId() {
      let proximoId = localStorage.getItem('id');
      return parseInt(proximoId) + 1;
    }
  
    gravar(desp) {
      let id = this.getProximoId();
      localStorage.setItem(id, JSON.stringify(desp));
      localStorage.setItem('id', id);
    }
  
    recuperarTodosRegistros() {
      let desps = Array();
  
      let id = localStorage.getItem('id');
      for (let i = 1; i <= id; i++) {
        let desp = JSON.parse(localStorage.getItem(i));
        if (desp === null) {
          continue;
        }
        desp.id = i;
        desps.push(desps);
      }
  
      return desps;
    }
  
    pesquisar(desp) {
      let despsFiltradas = Array();
      despsFiltradas = this.recuperarTodosRegistros();
  
      if (desps.ano != '') {
        despsFiltradas = despsFiltradas.filter((ano) => ano.ano == desp.ano);
      }
      if (desp.mes != '') {
        despsFiltradas = despsFiltradas.filter((mes) => mes.mes == desp.mes);
      }
      if (desps.dia != '') {
        despsFiltradas = despsFiltradas.filter((dia) => dia.dia == desp.dia);
      }
      if (desp.tipo != '') {
        despsFiltradas = despsFiltradas.filter((tipo) => tipo.tipo == desp.tipo);
      }
      if (desp.descricao != '') {
        despsFiltradas = despsFiltradas.filter(
          (descricao) => descricao.descricao == desp.descricao
        );
      }
      if (desp.valor != '') {
        despsFiltradas = despsFiltradas.filter((valor) => valor.valor == desp.valor);
      }
  
      return despsFiltradas;
    }
    remover(id) {
      localStorage.removeItem(id);
    }
  }
  
  let db = new Db();
  
  function cadastrarDesp() {
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');
  
    let desp = new Desp(
      ano.value,
      mes.value,
      dia.value,
      tipo.value,
      descricao.value,
      valor.value
    );
  
    if (desp.validarDados()) {
      db.gravar(desp);
      $('#modal_titulo').text('Registro inserido com sucesso!');
      $('#modal_titulo_div').addClass('modal-header text-success');
      $('#modal_conteudo').text('Dispesa cadastrada com sucesso!');
      $('#modal_btn').text('Voltar');
      $('#modal_btn').addClass('btn btn-success');
      $('#modalRegistraDesp').modal('show');
  
      ano.value = '';
      mes.value = '';
      dia.value = '';
      tipo.value = '';
      descricao.value = '';
      valor.value = '';
    } else {
      $('#modal_titulo').text('Erro!');
      $('#modal_titulo_div').addClass('modal-header text-danger');
      $('#modal_conteudo').text(
        'Erro!! Verifique se todos os campos foram preenchidos corretamente!'
      );
      $('#modal_btn').text('Corrigir');
      $('#modal_btn').addClass('btn btn-danger');
      $('#modalRegistraDesp').modal('show');
    }
  }
  
  function carregaListaDesps(desps = Array(), filtro = false) {
    if (desps.length == 0 && filtro == false) {
      desps = db.recuperarTodosRegistros();
    }
  
    let listaDesps = document.getElementById('listaDesps');
    listaDesps.innerHTML = '';
    desps.map((desp) => {
      let linha = listaDesps.insertRow();
      linha.insertCell(0).innerHTML = `${desp.dia}/${desp.mes}/${desp.ano}`;
  
      switch (desp.tipo) {
        case '1':
          desp.tipo = 'Alimentação';
          break;
        case '2':
          desp.tipo = 'Educação';
          break;
        case '3':
          desp.tipo = 'Lazer';
          break;
        case '4':
          desp.tipo = 'Saúde';
          break;
        case '5':
          desp.tipo = 'Transporte';
          break;
      }
      linha.insertCell(1).innerHTML = desp.tipo;
  
      linha.insertCell(2).innerHTML = desp.descricao;
      linha.insertCell(3).innerHTML = desp.valor;
  
      let btn = document.createElement('button');
      btn.className = 'btn btn-danger';
      btn.innerHTML = '<i class="fas fa-times"></i>';
      btn.id = `id_desp_${desp.id}`;
      btn.onclick = function () {
        let id = this.id.replace('id_desp_', '');
        db.remover(id);
        window.location.reload();
      };
      linha.insertCell(4).append(btn);
    });
  }
  
  function pesquisarDesp() {
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;
  
    let desp = new Desp(ano, mes, dia, tipo, descricao, valor);
    let desps = db.pesquisar(desp);
    let listaDesps = document.getElementById('listaDesps');
    listaDesps.innerHTML = '';
    carregaListaDesps(desps, true);
  }