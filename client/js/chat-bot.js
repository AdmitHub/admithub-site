export function chatBot() {
  'use strict';

  let data = {},
      step2 = {
        'menu': [
          {
            'title': 'Educator',
            'startStep': true,
            'stepnum': '3',
          },
          {
            'title': 'Student or Parent',
            'submenu': [
              {
                'message': 'That’s great.  Let’s continue this conversation on Facebook, and I can help with every aspect of applying to college',
                'title': 'Facebook Messenger',
                'href': 'https://www.messenger.com/t/admithub/',
              },
            ],
          },
          {
            'title': 'None of these',
          },
        ],
      },
      step3 = {
        'menu': [
          {
            'title': 'College or University',
            'startStep': true,
            'stepnum': '4',
          },
          {
            'title': 'High School',
            'submenu': [
              {
                'message': '&#x1f44d;',
                'stepnum': '4',
              },
            ],
          },
          {
            'title': 'Other',
            'submenu': [
              {
                'message': '&#x1f44d;',
                'stepnum': '4',
              },
            ],
          },
        ],
      },
      step4 = {
        'menu': [
          {
            'title': 'Admission Officer',
            'startStep': true,
            'stepnum': '5',
          },
          {
            'title': 'Dean or VP',
            'startStep': true,
            'stepnum': '5',
          },
          {
            'title': 'Student Success',
            'startStep': true,
            'stepnum': '5',
          },
          {
            'title': 'Something else',
            'startStep': true,
            'stepnum': '5',
          },
        ],
      },
      step5 = {
        'menu': [
          {
            'inputStep': true,
            'startStep': true,
            'stepnum': '6',
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
        'Which of these best describes who you are?',
        'What best describes where you work?',
        'Which of these best describes your role?',
        'What institution do you work for?',
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
          menu += `<input type="text" id="collegeName" placeholder="College Name" /> <button data-step="${nextStep}" class="choice input startStep">Submit</button>`;
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

  const menuClick = (clicked, num) => {
    let submenu = '',
      message = '',
      step = eval(`step${num}`),
      menuChoice = step.menu[clicked.getAttribute('data-submenu')];

    menuChoice.submenu.forEach(val => {
      if (val.href && val.title) {
        submenu += `<a href="${val.href}"><button class="submenu">${val.title}</button></a>`;
      }
      // else if (val.startStep) {
      //   submenu += `<button data-step="${val.stepnum}" class="choice startStep">${val.title}</button>`;
      // }

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
          const input = e.target.parentNode.getElementsByTagName('input')[0];
          const inputId = input.getAttribute('id');

          data[inputId] = input.value;
          makeUserBubble(input);
        } else {
          makeUserBubble(e.target);
        }
      }

      if (e.target.classList.contains('menu')) {
        const stepNum = e.target.getAttribute('data-step');
        menuClick(e.target, stepNum);
      }

      // if (e.target.classList.contains('submenu')) {
      //   subMenuClick(e.target);
      // }

      if (e.target.classList.contains('startStep')) {
        const stepNum = e.target.getAttribute('data-step');

        if (stepNum === '2') {
          newMessage(`Nice to meet you, ${data["firstName"]}.`, 'bot');
          showMenu(stepNum);
        }

        if (stepNum === '3') {
          newMessage('Okay great!', 'bot');
          showMenu(stepNum);
        }

        if (stepNum === '4') {
          setTimeout(() => {
            newMessage('&#x1f44d;', 'bot');
            setTimeout(() => {
              newMessage('[problems we solve]', 'bot');
              setTimeout(() => {
                showMenu(stepNum);
              }, 300);
            }, 300);
          }, 500);
        }

        if (stepNum === '5') {
          newMessage(' [benefit we bring]', 'bot');
          showMenu(stepNum);
        }

        if (stepNum === '6') {
          newMessage(`Does ${data["collegeName"]}....`, 'bot');
          showMenu(stepNum);
        }
      }

      // if (e.target.classList.contains('showmenu')) {
      //   showMenu();
      // }

      // if (e.target.classList.contains('showinfo')) {
      //   let infoReplies = [
      //       'Here\'s my website ',
      //       'Here you go: ',
      //       'Check this one out '
      //     ],
      //     okReplies = [
      //       'OK &#x1F60E;',
      //       'How do I get back? &#x1F312;',
      //       'Ok, thanks! &#x1F44C;'
      //     ];
      //   setTimeout(() => {
      //     newMessage(`${randomReply(infoReplies)} <a target="_new" href="https://librarian.codes">https://librarian.codes</a>`, 'bot');
      //     setTimeout(() => {
      //       newMessage(`<button class="choice newmenu showmenu">${randomReply(okReplies)}</button>`);
      //     }, 300);
      //   }, 500);
      // }
    }
    if (e.target.classList.contains('close')) {
      toggleContent();
    }
  });

  window.addEventListener('popstate', () => {
    toggleContent();
  });

  setTimeout(() => {
    init();
  }, 500);
};
