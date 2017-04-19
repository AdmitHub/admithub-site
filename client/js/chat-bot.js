export function chatBot() {
  'use strict';

  let data = {},
      step2 = {
        'menu': [
          {
            'title': 'High School',
            'startConclusion': 'true',
            'conclusionnum': '2'
          },
          {
            'title': 'College or University',
            'startStep': true,
            'stepnum': '3',
          },
          {
            'title': 'I\'m A Student',
            'submenu': [
              {
                'message': 'No worries.  We can always chat on Facebook. Just click the button below... ',
                'title': 'Facebook Messenger',
                'href': 'https://www.messenger.com/t/admithub/',
              },
            ],
          },
          {
            'title': 'None of these',
            'startConclusion': 'true',
            'conclusionnum': '2',
          },
        ],
      },
      step3 = {
        'menu': [
          {
            'title': 'Admission Officer',
            'startStep': true,
            'stepnum': '4',
          },
          {
            'title': 'Dean or VP',
            'startStep': true,
            'stepnum': '4',
          },
          {
            'title': 'Student Success',
            'startStep': true,
            'stepnum': '4',
          },
          {
            'title': 'Something else',
            'startStep': true,
            'stepnum': '4',
          },
        ],
      },
      step4 = {
        'menu': [
          {
            'inputStep': true,
            'startStep': true,
            'id': 'collegeName',
            'placeholder': 'College Name',
            'stepnum': '5',
          },
        ],
      },
      step5 = {
        'menu': [
          {
            'inputStep': true,
            'startStep': true,
            'id': 'email',
            'placeholder': 'Email Address',
            'stepnum': '6',
          },
        ],
      },
      conclusion1 = {
        'menu': [
          {
            'inputStep': true,
            'id': 'collegeName',
            'placeholder': 'College Name',
            'startConclusion': true,
            'conclusionnum': '2',
          },
        ],
      },
      conclusion2 = {
        'menu': [
          {
            'title': 'Yes!',
            'startConclusion': true,
            'conclusionnum': '3',
          },
          {
            'title': 'No thanks.',
            'end': true,
            'submenu': [
              {
                'message': 'Okay.  Feel free to come back if you change your mind.',
              },
            ],
          },
        ],
      },
      conclusion3 = {
        'menu': [
          {
            'inputStep': true,
            'id': 'email',
            'placeholder': 'Email Address',
            'end': true,
          },
        ],
      },
    idle,
    idletime = 45000;
  const chat = document.querySelector('.chat');
  const content = document.querySelector('.content');

  const newMessage = (message, type = 'user') => {
    let bubble = document.createElement('section'),
      slideIn = (el, i) => {
        setTimeout(() => {
          el.classList.add('show');
        }, i * 150 ? i * 150 : 10);
      },
      scroll,
      scrollDown = () => {
        chat.scrollTop += Math.floor(bubble.offsetHeight / 18);
      };
    bubble.classList.add('message');
    bubble.classList.add(type);
    bubble.innerHTML = `<p>${message}</p>`;
    chat.appendChild(bubble);

    scroll = window.setInterval(scrollDown, 16);
    setTimeout(() => {
      window.clearInterval(scroll);
      chat.scrollTop = chat.scrollHeight;
    }, 300);

    setTimeout(() => {
      bubble.classList.add('show');
    }, 10);

    if (type === 'user') {
      let animate = chat.querySelectorAll('button:not(:disabled)');
      for (let i = 0; i < animate.length; i += 1) {
        slideIn(animate[i], i);
      }
      bubble.classList.add('active');
    }
  };

  // const randomReply = replies => replies[Math.floor(Math.random() * replies.length)];

  const init = () => {
    let welcomeReplies = [
      'Hi! I’m Oli, a virtual assistant to teach you about AdmitHub. What do your friends call you?'
    ];
    idle = window.setInterval(() => {
      window.clearInterval(idle);
    }, idletime);
    newMessage(welcomeReplies, 'bot');
    setTimeout(() => {
      newMessage(`<input type="text" id="firstName" placeholder="First Name" /> <button data-step="2" class="choice input startStep">Submit</button>`);
    }, 300);
  };

  const makeUserBubble = el => {
    el.parentNode.parentNode.classList.add('selected');
    el.parentNode.parentNode.classList.remove('active');
    if (el.value) {
      el.parentNode.innerHTML = el.value;
    } else {
      el.parentNode.innerHTML = el.textContent;
    }
  };

  const showMenu = num => {
    let menu = '',
      nextStep = parseInt(num) + 1,
      step = eval(`step${num}`),
      goBack = chat.querySelector('button.newmenu'),
      replies = [
        'And what best describes where you work?',
        'Which of these best describes your role?',
        'What institution do you work for?',
        'Finally, what’s your email address?',
      ];
    if (goBack) {
      makeUserBubble(goBack);
    }
    setTimeout(() => {
      newMessage(replies[num-2], 'bot');
      step.menu.forEach((val, index) => {
        if (val.submenu) {
          menu += `<button class="choice menu" data-step="${num}" data-submenu="${index}">${val.title}</button>`;
        }
        else if (val.inputStep && val.startStep) {
          menu += `<input type="text" id="${val.id}" placeholder="${val.placeholder}" /> <button data-step="${nextStep}" class="choice input startStep">Submit</button>`;
        }
        else if (val.startConclusion) {
          menu += `<button class="choice startConclusion" data-conclusion="${val.conclusionnum}">${val.title}</button>`;
        }
        else {
          menu += `<button class="choice startStep" data-step="${nextStep}">${val.title}</button>`;
        }
      });
      setTimeout(() => {
        newMessage(menu);
      }, 300);
    }, 500);
    idle = window.setInterval(() => {
      window.clearInterval(idle);
    }, idletime);
  };

  const showConclusion = num => {
    let menu = '',
      nextConclusion = parseInt(num) + 1,
      conclusion= eval(`conclusion${num}`),
      goBack = chat.querySelector('button.newmenu');
    if (goBack) {
      makeUserBubble(goBack);
    }
    setTimeout(() => {
      conclusion.menu.forEach((val, index) => {
        if (val.submenu) {
          menu += `<button class="choice menu" data-conclusion="${num}" data-submenu="${index}">${val.title}</button>`;
        }
        else if (val.inputStep) {
          menu += `<input type="text" id="${val.id}" placeholder="${val.placeholder}" /> <button data-conclusion="${nextConclusion}" class="choice startConclusion input">Submit</button>`;
        }
        else {
          menu += `<button class="choice startConclusion" data-conclusion="${nextConclusion}">${val.title}</button>`;
        }
      });
      setTimeout(() => {
        newMessage(menu);
      }, 300);
    }, 500);
    idle = window.setInterval(() => {
      window.clearInterval(idle);
    }, idletime);
  };

  const stepMenuClick = (clicked, num) => {
    let submenu = '',
      message = '',
      step = eval(`step${num}`),
      menuChoice = step.menu[clicked.getAttribute('data-submenu')];

    menuChoice.submenu.forEach(val => {
      if (val.href && val.title) {
        submenu += `<a href="${val.href}"><button class="submenu">${val.title}</button></a>`;
      }
      message += val.message;

    });
    setTimeout(() => {
      newMessage(message, 'bot');
      setTimeout(() => {
          newMessage(submenu);
      }, 300);
    }, 500);
  };

  const toggleContent = article => {
    let buttons = chat.querySelectorAll('button');
    if (article) {
      article.classList.add('show');
      chat.setAttribute('aria-hidden', 'true');
      content.setAttribute('aria-hidden', 'false');
      content.tabIndex = '0';
      content.focus();
    } else {
      content.setAttribute('aria-hidden', 'true');
      content.tabIndex = '-1';
      chat.setAttribute('aria-hidden', 'false');
      if (history.state && history.state.id === 'content') {
        history.back();
      }
      setTimeout(() => {
        let active = document.querySelector('.content article.show');
        if (active) {
          active.classList.remove('show');
          chat.querySelector(`button[data-content="${active.id}"]`).focus();
        }
      }, 300);
    }
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].tabIndex = article ? '-1' : '0';
    }
  };

  /** Show extra info **/
  // const subMenuClick = clicked => {
  //   if (clicked.classList.contains('newmenu')) {
  //     showMenu(true);
  //   } else {
  //     toggleContent(document.getElementById(clicked.getAttribute('data-content')));
  //     history.pushState({'id': 'content'}, '', `#${clicked.getAttribute('data-content')}`);
  //   }
  // };

  document.addEventListener('click', e => {
    if (e.target.classList.contains('choice')) {
      window.clearInterval(idle);
      if (!e.target.classList.contains('submenu')) {
        if (e.target.classList.contains('input')) {
          const parentHTML = e.target.parentNode.innerHTML;
          const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          const input = e.target.parentNode.getElementsByTagName('input')[0];
          const inputId = input.getAttribute('id');
          const emailInput = document.getElementById('email');

          makeUserBubble(input);

          if (input.id === 'email' && !input.value.match(emailRegex)) {
            newMessage('Pleae enter a valid email','bot');

            newMessage(parentHTML);
            return;
          }

          if (input.value === '') {

            newMessage(`Pleae enter your ${input.placeholder.toLowerCase()}`,'bot');

            newMessage(parentHTML);
            return;
          }
          else {
            data[inputId] = input.value;
          }
        } else {
          makeUserBubble(e.target);
        }
      }

      if (e.target.classList.contains('menu')) {
        const stepNum = e.target.getAttribute('data-step');
        stepMenuClick(e.target, stepNum);
      }

      if (e.target.classList.contains('startStep')) {
        const stepNum = e.target.getAttribute('data-step');

        switch (stepNum) {
          case '2':
            setTimeout(() => {
              newMessage(`Nice to meet you ${data["firstName"]}`, 'bot');
              setTimeout(() => {
                newMessage('[one sentence about what we do…]', 'bot');
                setTimeout(() => {
                  showMenu(stepNum);
                }, 300);
              }, 300);
            }, 500);
            break;

          case '3':
            setTimeout(() => {
              newMessage('Okay great!', 'bot');
              setTimeout(() => {
                newMessage('[describe the problems we solve]', 'bot');
                setTimeout(() => {
                  showMenu(stepNum);
                }, 300);
              }, 300);
            }, 500);

            break;

          case '4':
            newMessage('[benefit we bring]', 'bot');
            showMenu(stepNum);
            break;

          case '5':
            newMessage(`Does ${data["collegeName"]}....`, 'bot');
            showMenu(stepNum);
            break;

          case '6':
            newMessage('Thanks, you rock!', 'bot');
            break;

          }
        }
      }

      if (e.target.classList.contains('startConclusion')) {
        const conclusionNum = e.target.getAttribute('data-conclusion');

        switch (conclusionNum) {
          case '1':
            newMessage('What’s the name of your school or organization?', 'bot');
            showConclusion(conclusionNum);
            break;

          case '2':
            newMessage('Do you want to sign-up for our newsletter to get the latest and greatest news about AdmitHub?', 'bot');
            showConclusion(conclusionNum);
            break;

          case '3':
            newMessage('What’s your email address?', 'bot');
            showConclusion(conclusionNum);
            break;
        }
      }
    }
  );

  window.addEventListener('popstate', () => {
    toggleContent();
  });

  setTimeout(() => {
    init();
  }, 500);
};
