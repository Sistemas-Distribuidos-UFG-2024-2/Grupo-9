
//Esse campo é para alterar a cor conforme o nome que estiver no alerta ============
document.querySelectorAll('.home-info h3').forEach(function(element) {
    const text = element.textContent;

    if (text.includes("#Normal")) {
        element.style.color = "rgb(101, 213, 101)"; // Verde Claro
    } else if (text.includes("#Alerta")) {
        element.style.color = "rgb(255, 255, 102)"; // Amarelo Claro
    } else if (text.includes("#Crítico")) {
        element.style.color = "rgb(255, 102, 102)"; // Vermelho Claro
    } else if(text.includes("#Offline")) {
        element.style.color = "rgb(122, 113, 113)"; // Cinza Escuro
    }
});


//=======================================================================================
//Esse campo é somente para o navBar-barra de opções da direita ======================
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
};

navLinks.forEach(link => {
    link.onclick = (event) => {
        event.preventDefault(); // Evita o comportamento padrão de rolagem
        let targetId = link.getAttribute('href');
        let targetSection = document.querySelector(targetId);
        
        // Rola suavemente para a seção
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // Atualiza a classe active
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');

        // Fecha o menu se ele estiver aberto
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    };
});

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

//=======================================================================================
//Esse campo é somente para a barra de pesquisa ======================
document.querySelectorAll('.filter').forEach(checkbox => {
    checkbox.addEventListener('change', filterBoxes);
});

document.getElementById('searchInput').addEventListener('input', filterBoxes);

function filterBoxes() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const selectedStates = Array.from(document.querySelectorAll('.filter:checked')).map(checkbox => checkbox.value);
    const homeBoxes = document.querySelectorAll('.home-box');

    homeBoxes.forEach(box => {
        const name = box.querySelector('h4').textContent.toLowerCase();
        const ip = box.querySelector('h4').textContent.toLowerCase();
        const state = box.querySelector('h3').textContent.toLowerCase();

        const matchesQuery = name.includes(query) || ip.includes(query);
        const matchesState = selectedStates.length === 0 || selectedStates.some(stateValue => state.includes(stateValue.toLowerCase()));

        if (matchesQuery && matchesState) {
            box.style.display = ''; // Mostrar o box
        } else {
            box.style.display = 'none'; // Ocultar o box
        }
    });
}

//=======================================================================================
//Esse campo é para o observable ======================
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import axios from 'axios';

const apiUrl = 'https://sua-api-gateway.com/endpoint'; // URL da API gateway

// Função para fazer a requisição
const fetchData = () => axios.get(apiUrl);

// Cria um Observable que emite um valor a cada 5 segundos (5000 milissegundos)
const requestInterval = interval(5000).pipe(
  switchMap(() => fetchData()) // Faz a requisição a cada emissão
);

// Se inscreva no Observable para começar a receber as respostas
requestInterval.subscribe({
  next: (response) => {
    console.log('Dados recebidos:', response.data);
  },
  error: (err) => {
    console.error('Erro na requisição:', err);
  }
});

/*
-O operador interval cria um Observable que emite eventos a cada 5 segundos.
-O operador switchMap é usado para disparar uma nova requisição cada vez que o interval emite um valor, cancelando a requisição anterior caso ela ainda esteja em andamento.
-A função fetchData usa axios para fazer a chamada à API.
-Você pode ajustar o intervalo e a URL da API conforme necessário.*/
