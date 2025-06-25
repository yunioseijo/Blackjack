const blackjackModule = (() => {
  "use strict";
  let e = [],
    a = [],
    t = document.querySelector("#btn-start-game"),
    n = document.querySelector("#btn-ask-for-card"),
    s = document.querySelector("#btn-stand"),
    r = document.querySelectorAll("small.player-points"),
    l = document.querySelectorAll(".container-cards"),
    d =
      document.querySelector("#result") ||
      (() => {
        let e = document.createElement("div");
        return (
          (e.id = "result"),
          (e.style.fontWeight = "bold"),
          (e.style.fontSize = "1.2em"),
          (e.style.marginTop = "1em"),
          playerCardsElement.parentNode.appendChild(e),
          e
        );
      })(),
    i = () => {
      e = [];
      for (let a = 2; a <= 10; a++) e.push(`${a}C`, `${a}D`, `${a}H`, `${a}S`);
      let t = ["J", "Q", "K", "A"];
      for (let n of t) e.push(`${n}C`, `${n}D`, `${n}H`, `${n}S`);
      return _.shuffle(e);
    },
    c = (t = 2) => {
      (a = Array(t).fill(0)),
        (e = i()),
        r.forEach((e) => (e.innerText = "Puntuaci\xf3n: 0")),
        l.forEach((e) => (e.innerHTML = "")),
        console.log(
          `Deck created with ${e.length} cards. and ${t} players. Ready to play!!!`
        );
    },
    o = (e, t) => (
      (a[t] += g(e)), (r[t].innerText = `Puntuaci\xf3n: ${a[t]}`), a[t]
    ),
    u = () => {
      if (0 === e.length) throw "No cards in the deck";
      return e.shift();
    },
    g = (e) => {
      let a = e.substring(0, e.length - 1);
      return isNaN(a) ? ("A" === a ? 11 : 10) : 1 * a;
    };
  function b(e, a) {
    d.classList.remove("bg-success", "bg-danger", "bg-info", "d-none"),
      d.classList.add(a, "d-inline-block"),
      (d.innerText = e);
  }
  n.addEventListener("click", () => {
    let e = u(),
      a = o(e, 0);
    p(e, 0),
      a > 21
        ? ((n.disabled = !0),
          (s.disabled = !0),
          b("\xa1Te pasaste de 21! Pierdes.", "bg-danger"))
        : 21 === a &&
          ((n.disabled = !0),
          (s.disabled = !0),
          b("\xa1Llegaste a 21! \xa1Ganaste!", "bg-success"));
  });
  let p = (e, a) => {
    let t = document.createElement("img");
    t.classList.add("carta"),
      (t.src = `assets/cartas/${e}.png`),
      (t.alt = e),
      l[a].append(t);
  };
  async function f(e) {
    return new Promise((a) => setTimeout(a, e));
  }
  s.addEventListener("click", () => {
    (n.disabled = !0), (s.disabled = !0), $(a[0]);
  });
  let $ = async (e) => {
    let t = 0;
    do {
      let n = u();
      if (((t = o(n, a.length - 1)), p(n, a.length - 1), e > 21)) {
        b("La computadora gana, t\xfa te pasaste de 21.", "bg-danger");
        break;
      }
      if ((await f(500), 21 === t)) {
        b("La computadora lleg\xf3 a 21, \xa1gana!", "bg-danger");
        break;
      }
      if (t > 21) {
        b(
          "\xa1La computadora se pas\xf3 de 21! \xa1T\xfa ganas!",
          "bg-success"
        );
        break;
      }
      if (t > e && t <= 21) {
        b("La computadora gana por tener m\xe1s puntos.", "bg-danger");
        break;
      }
    } while (t <= e && t <= 21);
    t === e && t <= 21 && e <= 21 && b("\xa1Empate!", "bg-info");
  };
  return (
    t.addEventListener("click", () => {
      c(2),
        (n.disabled = !1),
        (s.disabled = !1),
        (d.innerText = ""),
        d.classList.remove("d-inline-block"),
        d.classList.add("d-none");
    }),
    { newGame: c, createDeck: i, showResult: b, addImageCard: p }
  );
})();
