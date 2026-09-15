const CHAVE_API = "AQ.Ab8RN6Lhvbh2X5t4IuPFkuK_-ie8y36OugygV8R7zGiOqBOGug";

// Modelo usado — o "flash" é o mais rápido e o que tem mais cota gratuita.
const MODELO = "gemini-3.5-flash-lite";

//Prompt fixo: define quem é a IA e o que ela sabe sobre o carro do usuário.
const PROMPT_FIXO = `
Você é o **Mentor IA de Programação e Tecnologia**, especializado exclusivamente em **programação, desenvolvimento de software, computação e disciplinas técnicas diretamente relacionadas à tecnologia**.

Seu objetivo é ensinar o usuário de forma prática, utilizando principalmente uma abordagem **socrática**, ajudando-o a desenvolver raciocínio lógico, capacidade de resolução de problemas e autonomia técnica.

## ESCOPO OBRIGATÓRIO

Seu escopo é **EXCLUSIVAMENTE programação e tecnologia**.

Você pode responder somente a assuntos diretamente relacionados a:

* **Programação e desenvolvimento de software**
* Linguagens de programação
* **Java, Python, JavaScript, C, C++, C#, Kotlin, Go, Rust** e outras linguagens
* **Spring, Spring Boot, .NET, Node.js, React, Angular, Vue** e outros frameworks e bibliotecas
* **APIs, REST, HTTP, WebSockets e integrações**
* **Bancos de dados, SQL, NoSQL e modelagem de dados**
* **Algoritmos e estruturas de dados**
* **Lógica de programação e raciocínio computacional**
* **Programação orientada a objetos**
* **Git, GitHub e controle de versão**
* **Testes de software**
* **Debugging e análise de erros**
* **Arquitetura de software**
* **Microsserviços**
* **Engenharia de software**
* **Padrões de projeto e boas práticas**
* **Sistemas operacionais**, quando relacionados à computação
* **Redes de computadores**, quando relacionadas à computação
* **Cloud, servidores, containers e infraestrutura de software**
* **Docker, Kubernetes e tecnologias relacionadas**
* **DevOps, CI/CD e automação de desenvolvimento**
* **Segurança da informação e cibersegurança**, dentro de contexto técnico e educacional
* **Inteligência artificial, machine learning e ciência de dados**
* **Ferramentas de desenvolvimento e ambientes de programação**
* IDEs, editores, terminal, linha de comando e ferramentas de desenvolvimento
* **Computação e fundamentos de tecnologia**
* Disciplinas acadêmicas diretamente relacionadas à computação e tecnologia
* Conceitos técnicos necessários para compreender ou desenvolver software

### Regra de exclusão

Se o assunto **não estiver diretamente relacionado a programação, computação, desenvolvimento de software ou tecnologia**, **NÃO RESPONDA AO CONTEÚDO DA PERGUNTA**.

Isso inclui, entre outros:

* política;
* religião;
* futebol e outros esportes;
* relacionamentos;
* entretenimento;
* notícias gerais;
* viagens;
* culinária;
* saúde;
* finanças pessoais;
* investimentos;
* direito;
* história;
* geografia;
* matemática sem relação com computação ou tecnologia;
* conselhos pessoais;
* opiniões sobre assuntos não técnicos;
* compras de produtos que não sejam relacionados à tecnologia;
* tarefas escolares ou acadêmicas que não sejam relacionadas à computação;
* qualquer outro assunto que não pertença diretamente ao escopo definido acima.

### Regra de fronteira

Não tente transformar artificialmente um assunto externo em um assunto tecnológico apenas para poder respondê-lo.

Exemplo:

Usuário: "Qual carro devo comprar?"

**Não responda**, mesmo que seja possível criar uma comparação utilizando programação ou tecnologia.

Usuário: "Qual carro é melhor para programar dentro dele?"

**Não responda sobre carros**, a menos que a pergunta seja especificamente sobre uma tecnologia computacional relacionada ao veículo.

Usuário: "Me ajude a organizar minhas finanças usando Java."

Você pode ensinar **Java ou desenvolvimento do sistema**, mas não deve oferecer consultoria financeira.

O fato de uma pergunta **poder ser respondida usando tecnologia** não significa que ela esteja dentro do escopo.

O assunto principal da pergunta deve ser tecnologia ou programação.

## COMO RECUSAR ASSUNTOS FORA DO ESCOPO

Quando o usuário perguntar algo fora do escopo, **não responda à pergunta e não desenvolva o assunto**.

Use uma resposta curta e consistente, por exemplo:

> **Posso ajudar apenas com programação, tecnologia e assuntos diretamente relacionados à computação.**

Não ofereça uma resposta parcial sobre o assunto externo.

Não dê conselhos sobre o assunto externo.

Não tente ser útil respondendo "só um pouco".

Não faça exceções porque a pergunta parece simples.

## REGRAS PRINCIPAIS DE ENSINO

* Seu objetivo não é apenas fornecer respostas, mas **ensinar o usuário a pensar como um programador**.
* Utilize uma abordagem **socrática** quando ela contribuir para o aprendizado.
* Ajude o usuário a formular hipóteses, testar ideias, identificar erros e chegar às próprias conclusões.
* Não faça perguntas desnecessárias apenas para parecer socrático.
* Quando a pergunta for simples e objetiva, **responda diretamente**.
* Quando o usuário estiver resolvendo um exercício ou problema, evite entregar imediatamente a solução completa.
* Primeiro tente descobrir **onde está a dificuldade**.
* Utilize progressivamente:

  1. pergunta orientadora;
  2. pista;
  3. explicação do conceito;
  4. exemplo;
  5. solução.
* Se o usuário estiver realmente travado, aumente o nível de ajuda.
* Se o usuário solicitar explicitamente uma solução completa, código ou implementação, você pode fornecer.
* Mesmo quando fornecer código pronto, explique **o raciocínio e as decisões técnicas** envolvidas.
* Nunca incentive o usuário a simplesmente copiar código sem compreender.

## QUANDO O USUÁRIO ENVIAR CÓDIGO

Ao analisar código:

* Primeiro entenda o **objetivo do código**.
* Analise a tentativa do usuário antes de reescrevê-la.
* Identifique exatamente onde está o problema.
* Explique **por que o problema acontece**.
* Diferencie:

`;

const CHAVE_HISTORICO = "carwise_historico_chat";

const areaMensagens = document.querySelector(".chat-body, .area-mensagens");
const campoMensagem = document.querySelector(".input-bar input, .campo-texto-chat");
const botaoEnviar = document.querySelector(".send-btn, .botao-enviar-chat");
const layoutAula = areaMensagens?.classList.contains("area-mensagens");

function carregarHistorico() {
  const salvo = localStorage.getItem(CHAVE_HISTORICO);
  return salvo ? JSON.parse(salvo) : [];
}

function salvarHistorico(historico) {
  localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(historico));
}

function escaparHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function markdownSimplesParaHtml(textoOriginal) {
  let texto = escaparHtml(textoOriginal);

  // Negrito: **texto**
  texto = texto.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Itálico: *texto* (roda depois do negrito, pra não conflitar com **)
  texto = texto.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Bullet points: linhas que começam com "- " ou "* " viram <li>
  const linhas = texto.split("\n");
  let html = "";
  let dentroDeLista = false;

  linhas.forEach((linha) => {
    const linhaBullet = linha.match(/^[-*]\s+(.*)/);
    if (linhaBullet) {
      if (!dentroDeLista) {
        html += "<ul>";
        dentroDeLista = true;
      }
      html += `<li>${linhaBullet[1]}</li>`;
    } else {
      if (dentroDeLista) {
        html += "</ul>";
        dentroDeLista = false;
      }
      if (linha.trim() !== "") html += linha + "<br>";
    }
  });
  if (dentroDeLista) html += "</ul>";

  return html;
}

function criarBalaoUsuario(texto) {
  const linha = document.createElement("div");
  if (layoutAula) {
    linha.className = "mensagem-aluno-grupo";
    linha.innerHTML = `
      <div class="identificacao-aluno">
        <span class="nome-remetente">Você (Rafael)</span>
        <span class="hora-mensagem">agora</span>
      </div>
      <div class="balao-aluno"></div>
    `;
    linha.querySelector(".balao-aluno").textContent = texto;
    return linha;
  }
  linha.className = "msg-row user";
  linha.innerHTML = '<div class="bubble-user"></div>';
  linha.querySelector(".bubble-user").textContent = texto;
  return linha;
}

function criarBalaoIA(texto) {
  const linha = document.createElement("div");
  if (layoutAula) {
    linha.className = "mensagem-ia-grupo";
    linha.innerHTML = `
      <div class="identificacao-ia">
        <span class="nome-remetente-ia">Mentor IA Dev</span>
        <span class="hora-mensagem">• agora</span>
      </div>
      <div class="balao-ia"></div>
    `;
    linha.querySelector(".balao-ia").innerHTML = markdownSimplesParaHtml(texto);
    return linha;
  }
  linha.className = "msg-row ai";
  linha.innerHTML = `
        <div class="ai-block">
            <div class="ai-avatar"><span>AI</span></div>
            <div class="ai-content">
                <div class="ai-card"><p class="ai-explainer"></p></div>
            </div>
        </div>
    `;
  linha.querySelector(".ai-explainer").innerHTML =
    markdownSimplesParaHtml(texto);
  return linha;
}

function mostrarIndicadorDigitando() {
  const linha = document.createElement("div");
  linha.className = "msg-row ai";
  linha.id = "indicador-digitando";
  linha.innerHTML = `
    <div class="ai-block">
      <div class="ai-avatar"><span>AI</span></div>
      <div class="ai-content">
        <div class="ai-card"><p class="ai-explainer">Digitando...</p></div>
            </div>
        </div>
    `;
  areaMensagens.appendChild(linha);
  areaMensagens.scrollTop = areaMensagens.scrollHeight;
}

function removerIndicadorDigitando() {
  const indicador = document.getElementById("indicador-digitando");
  if (indicador) indicador.remove();
}

function renderizarHistorico() {
  const historico = carregarHistorico();
  areaMensagens.innerHTML = "";

  if (historico.length === 0) {
    areaMensagens.appendChild(
      criarBalaoIA("Olá! Sou seu mentor de programação. Como posso ajudar?"),
    );
    return;
  }

  historico.forEach((mensagem) => {
    const balao =
      mensagem.role === "user"
        ? criarBalaoUsuario(mensagem.texto)
        : criarBalaoIA(mensagem.texto);
    areaMensagens.appendChild(balao);
  });

  areaMensagens.scrollTop = areaMensagens.scrollHeight;
}

function converterHistoricoParaGemini(historico) {
  return historico.map((mensagem) => ({
    role: mensagem.role === "user" ? "user" : "model",
    parts: [{ text: mensagem.texto }],
  }));
}

async function enviarMensagem() {
  const texto = campoMensagem.value.trim();
  if (!texto) return;

  // 1. Mostra a mensagem do usuário
  areaMensagens.appendChild(criarBalaoUsuario(texto));
  campoMensagem.value = "";
  areaMensagens.scrollTop = areaMensagens.scrollHeight;

  // 2. Monta o histórico que vai pra API, mas ainda NÃO salva no navegador.
  //    Só salvamos depois que a IA responder de verdade — assim, se der erro,
  //    não fica uma mensagem "órfã" (sem resposta) quebrando a alternância
  //    usuário/IA que o Gemini exige na conversa.
  const historicoAtual = carregarHistorico();
  const historicoParaEnviar = [
    ...historicoAtual,
    { role: "user", texto: texto },
  ];

  // 3. Mostra "digitando..." enquanto espera
  mostrarIndicadorDigitando();

  try {
    // 4. Chama a API do Gemini
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:generateContent?key=${CHAVE_API}`;

    const resposta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: PROMPT_FIXO }],
        },
        contents: converterHistoricoParaGemini(historicoParaEnviar),
        generationConfig: {
          thinkingConfig: {
            thinkingLevel: "LOW",
          },
        },
      }),
    });

    const dados = await resposta.json();
    removerIndicadorDigitando();

    if (!resposta.ok) {
      throw new Error(dados.error?.message || "Erro na API");
    }

    const partes = dados.candidates[0].content.parts;
    const textoResposta = partes
      .filter((parte) => !parte.thought) // ignora qualquer parte marcada como "pensamento"
      .map((parte) => parte.text)
      .join("");

    // 5. Mostra a resposta da IA
    areaMensagens.appendChild(criarBalaoIA(textoResposta));
    console.log(textoResposta);
    areaMensagens.scrollTop = areaMensagens.scrollHeight;

    // 6. Só agora salva os DOIS turnos juntos (usuário + IA)
    salvarHistorico([
      ...historicoParaEnviar,
      { role: "model", texto: textoResposta },
    ]);
  } catch (erro) {
    removerIndicadorDigitando();
    areaMensagens.appendChild(
      criarBalaoIA("Ops, não consegui responder agora. Erro: " + erro.message),
    );
    console.error("Erro ao chamar a IA:", erro);
    // Não salva nada aqui de propósito — assim a próxima tentativa
    // não herda uma conversa quebrada.
  }
}

// ---------- LIMPAR CONVERSA ----------
// Botão simples pra resetar o histórico salvo — útil pra limpar uma
// conversa que ficou "quebrada" por causa de algum erro anterior.
function limparConversa() {
  localStorage.removeItem(CHAVE_HISTORICO);
  renderizarHistorico();
}

// ---------- EVENTOS ----------

botaoEnviar.addEventListener("click", enviarMensagem);

campoMensagem.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    enviarMensagem();
  }
});

// ---------- INICIALIZAÇÃO ----------

renderizarHistorico();
