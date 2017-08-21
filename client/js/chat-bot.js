
export function chatBot() {
  'use strict';

  export let data = {};
  let step2 = {
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
            'title': 'I\'m still a student',
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
            'inputStep': true,
            'startStep': true,
            'id': 'collegeName',
            'placeholder': 'College Name',
            'stepnum': '4',
          },
        ],
      },
      step4 = {
        'menu': [
          {
            'inputStep': true,
            'startStep': true,
            'id': 'email',
            'placeholder': 'Email Address',
            'stepnum': '4',
          },
        ],
      },
      step5 = {
        'menu': [
          {
            'inputStep': true,
            'startStep': true,
            'id': 'topChallenge',
            'placeholder': 'Top Challenge',
            'stepnum': '5',
          },
        ],
      },
      step6 = {
        'menu': [
          {
            'inputStep': true,
            'startStep': true,
            'id': 'topPriority',
            'placeholder': 'Top Priority',
            'stepnum': 'end',
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
            'conclusionnum': 'end2',
          },
        ],
      },
      conclusion3 = {
        'menu': [
          {
            'inputStep': true,
            'id': 'email',
            'placeholder': 'Email Address',
            'conclusionnum': 'end3',
          },
        ],
      };
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

  const init = () => {
    let welcomeReplies = 'Hey there, I’m Oli, AdmitHub’s very own Mascot.  What’s your first name?';
    newMessage(welcomeReplies, 'bot');
    setTimeout(() => {
      newMessage(`<input type="text" id="firstName" placeholder="First Name" class="inputbox" /> <button data-step="2" class="choice input startStep">Submit</button>`);
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
      nextStep = '',
      step = eval(`step${num}`),
      goBack = chat.querySelector('button.newmenu'),
      replies = [
        'By the way, what best describes where you work?',
        'That reminds me, what college or university do you work for?',
        'So they can follow up, could you please tell me your email address.',
        'Out of curiosity, what\'s the biggest challenge you are facing today?',
        'Last but not least, what\'s your top priority this enrollment cycle?'
      ];

      if (num.match(/^[0-9]+$/)) {
        nextStep = parseInt(num) + 1;
      } else {
        nextStep = 'blah';
      }
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
          if (val.stepnum === 'end') {
            menu += `<input type="text" id="${val.id}" placeholder="${val.placeholder}" class="inputbox" /> <button data-step="end" class="choice input end startStep">Submit</button>`;
          } else {
            menu += `<input type="text" id="${val.id}" placeholder="${val.placeholder}" class="inputbox" /> <button data-step="${nextStep}" class="choice input startStep">Submit</button>`;
          }        }
        else if (val.startConclusion) {
          menu += `<button class="choice startConclusion" data-conclusion="${val.conclusionnum}">${val.title}</button>`;
        }
        else {
          menu += `<button class="choice startStep" data-step="${nextStep}">${val.title}</button>`;
        }
      });
      setTimeout(() => {
        console.log(menu)
        newMessage(menu);
      }, 300);
      setTimeout(() => { 
        $('.inputbox').focus() 
      }, 600);
    }, 500);
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
        if (val.inputStep) {
          if (val.conclusionnum === 'end3') {
            menu += `<input type="text" id="${val.id}" placeholder="${val.placeholder}" class="inputbox" /> <button data-conclusion="end3" class="choice startConclusion end input">Submit</button>`;
          } else {
            menu += `<input type="text" id="${val.id}" placeholder="${val.placeholder}" class="inputbox" /> <button data-conclusion="${nextConclusion}" class="choice startConclusion input">Submit</button>`;
          }
        }
        else {
          if (val.conclusionnum === 'end2') {
            menu += `<button class="choice startConclusion end" data-conclusion="end2">${val.title}</button>`;
          } else {
            menu += `<button class="choice startConclusion" data-conclusion="${nextConclusion}">${val.title}</button>`;
          }
        }
      });
      setTimeout(() => {
        newMessage(menu);
      }, 300);
    }, 500);
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

  // const toggleContent = article => {
  //   let buttons = chat.querySelectorAll('button');
  //   if (article) {
  //     article.classList.add('show');
  //     chat.setAttribute('aria-hidden', 'true');
  //     content.setAttribute('aria-hidden', 'false');
  //     content.tabIndex = '0';
  //     content.focus();
  //   } else {
  //     content.setAttribute('aria-hidden', 'true');
  //     content.tabIndex = '-1';
  //     chat.setAttribute('aria-hidden', 'false');
  //     if (history.state && history.state.id === 'content') {
  //       history.back();
  //     }
  //     setTimeout(() => {
  //       let active = document.querySelector('.content article.show');
  //       if (active) {
  //         active.classList.remove('show');
  //         chat.querySelector(`button[data-content="${active.id}"]`).focus();
  //       }
  //     }, 300);
  //   }
  //   for (let i = 0; i < buttons.length; i += 1) {
  //     buttons[i].tabIndex = article ? '-1' : '0';
  //   }
  // };

  /** Show extra info **/
  // const subMenuClick = clicked => {
  //   if (clicked.classList.contains('newmenu')) {
  //     showMenu(true);
  //   } else {
  //     toggleContent(document.getElementById(clicked.getAttribute('data-content')));
  //     history.pushState({'id': 'content'}, '', `#${clicked.getAttribute('data-content')}`);
  //   }
  // };

  document.addEventListener('keypress', function(e){
    if(e.target.classList.contains('inputbox')) {
      if(e.keyCode === 13){
        document.querySelector('.input').click();
      }
    }
  });

  document.addEventListener('click', e => {
    if (e.target.classList.contains('choice')) {
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
            if (data.topPriority) {
                Meteor.call(
                  'sendEmail',
                  'Sales <sales@admithub.com>',
                  'bot@admithub.com',
                  '2016543@bcc.hubspot.com',
                  'A new lead from this college or university: ' + data.collegeName,
                  'Here is a even more info' + 
                  '  Top Priority: ' + data.topPriority
                );
            } else if (data.topChallenge) {
                Meteor.call(
                  'sendEmail',
                  'Sales <sales@admithub.com>',
                  'bot@admithub.com',
                  '2016543@bcc.hubspot.com',
                  'A new lead from this college or university: ' + data.collegeName,
                  'Here is a bit more info' + 
                  '  Top Challenge: ' + data.topChallenge
                );
            } else if (data && data.collegeName && data.email) {
                Meteor.call(
                  'sendEmail',
                  'Sales <sales@admithub.com>',
                  'bot@admithub.com',
                  '2016543@bcc.hubspot.com',
                  'A new lead from this college or university:' + data.collegeName,
                  'We got a new lead from our web chat widget on our website:  ' +
                  'This college: ' + data.collegeName + '  ' +
                  'This person: ' + data.firstName + '  ' +
                  'Email address: ' + data.email + '  '
                );
              } else if (data && data.email) {
                Meteor.call(
                  'sendEmail',
                  'Sales <sales@admithub.com>',
                  'bot@admithub.com',
                  '2016543@bcc.hubspot.com',
                  data.firstName + ' is not at a college but wants to join our newsletter',
                  'and their email address is ' + data.email + '  '
                );
              }
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
              newMessage(`Nice to meet you, ${data["firstName"]}!`, 'bot');
              setTimeout(() => {
                newMessage('I think a conversation is way more personal than filling out a web form. Hopefully you agree.', 'bot');
                setTimeout(() => {
                  showMenu(stepNum);
                }, 300);
              }, 300);
            }, 500);
            break;

          case '3':
            newMessage('Okay great! Like you, our job is to connect with students and help them succeed on the path to and through college.', 'bot');
            showMenu(stepNum);
            break;

          case '4':
          setTimeout(() => {
            newMessage('There’s ample research showing text message automation can significantly improve college enrollment and retention.', 'bot');
              setTimeout(() => {
                newMessage(`If you have a few minutes, our co-founders, Kirk and Drew, would love to learn more about ${data["collegeName"]} and your enrollment goals.`, 'bot');
                setTimeout(() => {
                  showMenu(stepNum);
                }, 300);
              }, 500);
            }, 500);
            break;

          case '5':
          setTimeout(() => {
            newMessage('We help several colleges and universities overcome their enrollment and retention challenges.', 'bot')
              setTimeout(() => {
                showMenu(stepNum);
              }, 300);
            }, 500);
            break;

          case '6':
            showMenu(stepNum);
            break;

          case 'end':
            setTimeout(() => {
              newMessage("Thanks, you rock!  We'll be in touch. In the meantime, here's a 3-minute video showcasing our vision for AI-powered student services.", 'bot');
                setTimeout(() => {
                  newMessage('<iframe width="560" height="315" src="https://www.youtube.com/embed/xAhIRi85zVc" frameborder="0" allowfullscreen></iframe>', 'bot');
                }, 500);
              }, 500);
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

            case 'end2':
              newMessage('Okay.  Feel free to come back if you change your mind.', 'bot');
              break;

            case 'end3':
              newMessage('Thanks!  We’ll be in touch.', 'bot');
              break;
        }
      }
    }
  );

  setTimeout(() => {
    init();
  }, 500);
};
