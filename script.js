/**
 * ==========================================================================
 * Katros | Interactive JavaScript & Live Booking Simulator
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide && window.lucide.createIcons) {
    window.lucide.createIcons();
  }

  initNavbarScroll();
  initInteractiveChatSimulator();
  initPricingToggle();
  initFaqAccordion();
  initPlanModal();
});

/**
 * Navbar blur effect on scroll
 */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/**
 * ==========================================================================
 * THE WOW CENTERPIECE: Interactive Chat Booking Simulation
 * ==========================================================================
 */
function initLegacyInteractiveChatSimulator() {
  const messagesContainer = document.getElementById('chat-messages');
  const actionsContainer = document.getElementById('chat-actions');
  const resetBtn = document.getElementById('btn-reset-chat');

  if (!messagesContainer || !actionsContainer) return;

  // Simulator state
  let bookingData = {
    service: null,
    price: null,
    barber: null,
    datetime: null
  };

  // Start chat flow
  startSimulation();

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      startSimulation();
    });
  }

  function startSimulation() {
    bookingData = { service: null, price: null, barber: null, datetime: null };
    messagesContainer.innerHTML = '';
    actionsContainer.innerHTML = '';

    // Initial greeting from bot
    appendBotMessage("Olá! Seja bem-vindo à <strong>Barbearia VIP Lounge</strong> ✂️<br>Como posso te ajudar hoje?");
    
    // Show step 1 options
    setTimeout(() => {
      showServiceOptions();
    }, 450);
  }

  function appendBotMessage(text, delay = 0) {
    setTimeout(() => {
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble chat-bubble-bot';
      bubble.innerHTML = text;
      messagesContainer.appendChild(bubble);
      scrollToBottom();
    }, delay);
  }

  function appendUserMessage(text) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble chat-bubble-user';
    bubble.innerHTML = text;
    messagesContainer.appendChild(bubble);
    scrollToBottom();
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function renderActions(buttons) {
    actionsContainer.innerHTML = '';
    buttons.forEach(btnInfo => {
      const btn = document.createElement('button');
      btn.className = 'chat-action-btn';
      btn.innerHTML = `<span>${btnInfo.label}</span> <i data-lucide="${btnInfo.icon || 'chevron-right'}" class="w-4 h-4 text-blue"></i>`;
      btn.addEventListener('click', () => {
        actionsContainer.innerHTML = '<div class="text-xs text-center text-gray-500 py-4"><span class="status-dot-pulse inline-block mr-1"></span> IA processando agendamento...</div>';
        btnInfo.onClick();
      });
      actionsContainer.appendChild(btn);
    });

    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  }

  // STEP 1: Choose Service
  function showServiceOptions() {
    renderActions([
      {
        label: '💈 Corte de Cabelo (R$ 45,00)',
        icon: 'scissors',
        onClick: () => selectService('Corte de Cabelo', 'R$ 45,00')
      },
      {
        label: '✂️ Barba Completa (R$ 35,00)',
        icon: 'smile',
        onClick: () => selectService('Barba Completa', 'R$ 35,00')
      },
      {
        label: '🔥 Combo Cabelo + Barba (R$ 75,00)',
        icon: 'sparkles',
        onClick: () => selectService('Combo Cabelo + Barba', 'R$ 75,00')
      }
    ]);
  }

  function selectService(serviceName, price) {
    bookingData.service = serviceName;
    bookingData.price = price;

    appendUserMessage(`${serviceName} (${price})`);

    appendBotMessage(`Ótima escolha! Para o <strong>${serviceName}</strong>, com qual barbeiro você prefere ser atendido?`, 600);

    setTimeout(() => {
      showBarberOptions();
    }, 1100);
  }

  // STEP 2: Choose Barber
  function showBarberOptions() {
    renderActions([
      {
        label: '👨‍🦱 Lucas Silva (Master Barber)',
        icon: 'user-check',
        onClick: () => selectBarber('Lucas Silva')
      },
      {
        label: '🧔 Carlos Eduardo (Especialista)',
        icon: 'user-check',
        onClick: () => selectBarber('Carlos Eduardo')
      },
      {
        label: '⚡ Qualquer profissional disponível',
        icon: 'zap',
        onClick: () => selectBarber('Primeiro Disponível')
      }
    ]);
  }

  function selectBarber(barberName) {
    bookingData.barber = barberName;

    appendUserMessage(barberName);

    appendBotMessage(`Perfeito! Consultei a agenda de <strong>${barberName}</strong>. Qual destes horários fica melhor para você?`, 600);

    setTimeout(() => {
      showDateTimeOptions();
    }, 1100);
  }

  // STEP 3: Choose Date & Time
  function showDateTimeOptions() {
    renderActions([
      {
        label: '📅 Hoje, às 16:30',
        icon: 'clock',
        onClick: () => selectDateTime('Hoje, às 16:30')
      },
      {
        label: '📅 Amanhã, às 10:00',
        icon: 'clock',
        onClick: () => selectDateTime('Amanhã, às 10:00')
      },
      {
        label: '📅 Sexta-feira, às 18:00',
        icon: 'clock',
        onClick: () => selectDateTime('Sexta-feira, às 18:00')
      }
    ]);
  }

  function selectDateTime(dateTimeStr) {
    bookingData.datetime = dateTimeStr;

    appendUserMessage(dateTimeStr);

    appendBotMessage(`Confirmando o agendamento... ⚡`, 500);

    setTimeout(() => {
      showConfirmationTicket();
    }, 1200);
  }

  // STEP 4: Confirmation Ticket Generated
  function showConfirmationTicket() {
    const ticketHtml = `
      <div class="ticket-title">
        <span>✅ AGENDAMENTO CONFIRMADO</span>
      </div>
      <div class="ticket-row">
        <span>Barbearia:</span>
        <span>Barbearia VIP Lounge</span>
      </div>
      <div class="ticket-row">
        <span>Serviço:</span>
        <span>${bookingData.service}</span>
      </div>
      <div class="ticket-row">
        <span>Barbeiro:</span>
        <span>${bookingData.barber}</span>
      </div>
      <div class="ticket-row">
        <span>Data & Hora:</span>
        <span>${bookingData.datetime}</span>
      </div>
      <div class="ticket-row" style="margin-top: 0.6rem; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 0.5rem;">
        <span>Valor Total:</span>
        <span class="text-gradient font-bold">${bookingData.price}</span>
      </div>
    `;

    const ticketBubble = document.createElement('div');
    ticketBubble.className = 'chat-bubble-ticket';
    ticketBubble.innerHTML = ticketHtml;
    messagesContainer.appendChild(ticketBubble);

    appendBotMessage("Tudo certo! 🎉 Enviamos os detalhes e o lembrete automático no seu WhatsApp. Te esperamos na cadeira!", 600);
    
    scrollToBottom();

    renderActions([
      {
        label: '🔄 Simular Novo Agendamento',
        icon: 'rotate-ccw',
        onClick: () => startSimulation()
      },
      {
        label: '💈 Quero esse Chat na Minha Barbearia',
        icon: 'arrow-right',
        onClick: () => {
          const pricingSection = document.getElementById('planos');
          if (pricingSection) pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    ]);
  }
}

/**
 * Simulador inspirado no fluxo real do chat Katros/BarbeFlow.
 */
function initInteractiveChatSimulator() {
  const messagesContainer = document.getElementById('chat-messages');
  const actionsContainer = document.getElementById('chat-actions');
  const resetBtn = document.getElementById('btn-reset-chat');
  if (!messagesContainer || !actionsContainer) return;

  let bookingData = {};
  let messageSequence = 0;
  resetBtn?.addEventListener('click', startSimulation);
  startSimulation();

  function startSimulation() {
    bookingData = { name: '', phone: '', barber: '', service: '', price: '', date: '', time: '' };
    messageSequence += 1;
    messagesContainer.innerHTML = '';
    actionsContainer.innerHTML = '';
    actionsContainer.className = 'phone-footer phone-footer-compose';
    appendBotMessage('Olá! Bem-vindo(a) à <strong>Barbearia VIP Lounge</strong> ✂️<br>Sou o assistente virtual e vou facilitar seu agendamento.');
    setTimeout(() => {
      appendBotMessage('Para começar, qual é o seu nome completo?');
      showTextInput('Digite seu nome completo', handleName, 'user');
    }, 650);
  }

  function appendBotMessage(text) {
    const row = document.createElement('div');
    row.className = 'chat-message-row bot-row';
    row.innerHTML = `<div class="chat-mini-avatar"><img src="logo.png" alt=""></div><div><div class="chat-bubble chat-bubble-bot">${text}</div><span class="chat-time">agora</span></div>`;
    messagesContainer.appendChild(row);
    scrollToBottom();
  }

  function appendUserMessage(text) {
    const row = document.createElement('div');
    row.className = 'chat-message-row user-row';
    row.innerHTML = `<div><div class="chat-bubble chat-bubble-user">${text}</div><span class="chat-time">agora · ✓✓</span></div>`;
    messagesContainer.appendChild(row);
    scrollToBottom();
  }

  function scrollToBottom() {
    requestAnimationFrame(() => messagesContainer.scrollTo({ top: messagesContainer.scrollHeight, behavior: 'smooth' }));
  }

  function showTyping(next) {
    const token = messageSequence;
    const typing = document.createElement('div');
    typing.className = 'chat-message-row bot-row chat-typing-row';
    typing.innerHTML = `<div class="chat-mini-avatar"><img src="logo.png" alt=""></div><div class="chat-bubble chat-bubble-bot typing-bubble"><i></i><i></i><i></i></div>`;
    messagesContainer.appendChild(typing);
    scrollToBottom();
    setTimeout(() => {
      if (token !== messageSequence) return;
      typing.remove();
      next();
    }, 520);
  }

  function renderActions(buttons, label = 'ESCOLHA UMA OPÇÃO') {
    actionsContainer.innerHTML = '';
    actionsContainer.className = 'phone-footer';
    const eyebrow = document.createElement('span');
    eyebrow.className = 'action-eyebrow';
    eyebrow.textContent = label;
    actionsContainer.appendChild(eyebrow);
    const grid = document.createElement('div');
    grid.className = 'chat-actions-grid';

    buttons.forEach((item) => {
      const button = document.createElement('button');
      button.className = 'chat-action-btn';
      button.innerHTML = `<span class="action-icon"><i data-lucide="${item.icon || 'chevron-right'}"></i></span><span class="action-copy"><strong>${item.label}</strong>${item.meta ? `<small>${item.meta}</small>` : ''}</span><i data-lucide="chevron-right" class="action-arrow"></i>`;
      button.addEventListener('click', () => {
        actionsContainer.innerHTML = '<div class="chat-processing"><span></span><span></span><span></span> Consultando agenda</div>';
        item.onClick();
      });
      grid.appendChild(button);
    });
    actionsContainer.appendChild(grid);
    window.lucide?.createIcons();
  }

  function showTextInput(placeholder, handler, icon) {
    actionsContainer.className = 'phone-footer phone-footer-compose';
    actionsContainer.innerHTML = `<form class="chat-compose-form"><div class="chat-input-wrap"><i data-lucide="${icon}"></i><input type="text" autocomplete="off" placeholder="${placeholder}" aria-label="${placeholder}"></div><button type="submit" class="chat-send-btn" aria-label="Continuar"><i data-lucide="arrow-up"></i></button></form><span class="chat-privacy"><i data-lucide="shield-check"></i> Seus dados estão protegidos</span>`;
    const form = actionsContainer.querySelector('form');
    const input = actionsContainer.querySelector('input');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = input.value.trim();
      if (value.length < 2) return;
      handler(value);
    });
    window.lucide?.createIcons();
    requestAnimationFrame(() => {
      input.focus({ preventScroll: true });
    });
  }

  function handleName(name) {
    bookingData.name = name;
    appendUserMessage(name);
    actionsContainer.innerHTML = '';
    showTyping(() => {
      appendBotMessage(`Prazer, <strong>${name.split(' ')[0]}</strong>! 😊<br>Qual é o seu WhatsApp com DDD?`);
      showTextInput('(44) 99999-9999', handlePhone, 'phone');
    });
  }

  function handlePhone(phone) {
    bookingData.phone = phone;
    appendUserMessage(phone);
    actionsContainer.innerHTML = '';
    showTyping(() => {
      appendBotMessage('Tudo certo! Encontrei seu cadastro. Agora, quem você gostaria que te atendesse?');
      showBarberOptions();
    });
  }

  function showBarberOptions() {
    renderActions([
      { label: 'Lucas Silva', meta: 'Master Barber · disponível hoje', icon: 'user-round-check', onClick: () => selectBarber('Lucas Silva') },
      { label: 'Carlos Eduardo', meta: 'Especialista em barba', icon: 'user-round', onClick: () => selectBarber('Carlos Eduardo') },
      { label: 'Qualquer profissional', meta: 'O primeiro horário livre', icon: 'sparkles', onClick: () => selectBarber('Qualquer profissional') }
    ], 'ESCOLHA O PROFISSIONAL');
  }

  function selectBarber(barber) {
    bookingData.barber = barber;
    appendUserMessage(barber);
    showTyping(() => {
      appendBotMessage('Ótima escolha! Agora selecione o serviço que deseja agendar:');
      showServiceOptions();
    });
  }

  function showServiceOptions() {
    renderActions([
      { label: 'Corte de Cabelo', meta: '45 min · R$ 45,00', icon: 'scissors', onClick: () => selectService('Corte de Cabelo', 'R$ 45,00') },
      { label: 'Barba Completa', meta: '35 min · R$ 35,00', icon: 'sparkles', onClick: () => selectService('Barba Completa', 'R$ 35,00') },
      { label: 'Combo Cabelo + Barba', meta: '70 min · R$ 75,00', icon: 'badge-percent', onClick: () => selectService('Combo Cabelo + Barba', 'R$ 75,00') }
    ], 'SELECIONE O SERVIÇO');
  }

  function selectService(service, price) {
    bookingData.service = service;
    bookingData.price = price;
    appendUserMessage(`${service} · ${price}`);
    showTyping(() => {
      appendBotMessage(`Perfeito! <strong>${service}</strong> selecionado.<br>Agora escolha o melhor dia:`);
      renderActions([
        { label: 'Hoje, 29 jul', meta: '3 horários disponíveis', icon: 'calendar-days', onClick: () => selectDate('Hoje, 29 de julho') },
        { label: 'Amanhã, 30 jul', meta: '7 horários disponíveis', icon: 'calendar-check', onClick: () => selectDate('Amanhã, 30 de julho') },
        { label: 'Sexta, 31 jul', meta: '5 horários disponíveis', icon: 'calendar-plus', onClick: () => selectDate('Sexta, 31 de julho') }
      ], 'SELECIONE O DIA');
    });
  }

  function selectDate(date) {
    bookingData.date = date;
    appendUserMessage(date);
    showTyping(() => {
      appendBotMessage('Consultei a agenda em tempo real. Qual horário fica melhor para você?');
      renderActions([
        { label: '10:00', meta: 'Livre', icon: 'clock-3', onClick: () => selectTime('10:00') },
        { label: '14:30', meta: 'Livre', icon: 'clock-3', onClick: () => selectTime('14:30') },
        { label: '18:00', meta: 'Último horário', icon: 'clock-3', onClick: () => selectTime('18:00') }
      ], 'HORÁRIOS DISPONÍVEIS');
    });
  }

  function selectTime(time) {
    bookingData.time = time;
    appendUserMessage(time);
    showTyping(() => {
      appendBotMessage('Tudo pronto! Confira os dados antes de confirmar:');
      showConfirmation();
    });
  }

  function showConfirmation() {
    actionsContainer.className = 'phone-footer phone-footer-summary';
    actionsContainer.innerHTML = `<div class="booking-summary-card"><div class="summary-top"><span><i data-lucide="calendar-check-2"></i> Resumo do agendamento</span><strong>${bookingData.price}</strong></div><div class="summary-line"><span>Serviço</span><b>${bookingData.service}</b></div><div class="summary-line"><span>Profissional</span><b>${bookingData.barber}</b></div><div class="summary-line"><span>Quando</span><b>${bookingData.date}, ${bookingData.time}</b></div><button type="button" class="confirm-booking-btn"><i data-lucide="check"></i> Confirmar agendamento</button></div>`;
    actionsContainer.querySelector('.confirm-booking-btn').addEventListener('click', completeBooking);
    window.lucide?.createIcons();
  }

  function completeBooking() {
    actionsContainer.innerHTML = '';
    showTyping(() => {
      const ticket = document.createElement('div');
      ticket.className = 'chat-success-card';
      ticket.innerHTML = `<span class="success-icon"><i data-lucide="check"></i></span><div><strong>Agendamento confirmado!</strong><small>Você receberá o lembrete pelo WhatsApp.</small></div>`;
      messagesContainer.appendChild(ticket);
      actionsContainer.className = 'phone-footer phone-footer-complete';
      actionsContainer.innerHTML = `<button type="button" class="chat-action-btn restart-inline"><span class="action-icon"><i data-lucide="rotate-ccw"></i></span><span class="action-copy"><strong>Fazer outro agendamento</strong><small>Reiniciar demonstração</small></span></button>`;
      actionsContainer.querySelector('button').addEventListener('click', startSimulation);
      window.lucide?.createIcons();
      scrollToBottom();
    });
  }
}

/**
 * Pricing Billing Switcher (Monthly vs Yearly -20% OFF)
 */
function initPricingToggle() {
  const toggleBtn = document.getElementById('billing-toggle');
  const labelMonthly = document.getElementById('label-monthly');
  const labelYearly = document.getElementById('label-yearly');
  const amountElements = document.querySelectorAll('.pricing-card .amount');
  const billingNotes = document.querySelectorAll('.pricing-card .billing-note');

  if (!toggleBtn) return;

  let isYearly = false;

  toggleBtn.addEventListener('click', () => {
    isYearly = !isYearly;
    
    if (isYearly) {
      toggleBtn.classList.add('yearly');
      labelMonthly.classList.remove('active');
      labelYearly.classList.add('active');
    } else {
      toggleBtn.classList.remove('yearly');
      labelMonthly.classList.add('active');
      labelYearly.classList.remove('active');
    }

    // Update prices smoothly
    amountElements.forEach(el => {
      const targetValue = isYearly ? el.getAttribute('data-yearly') : el.getAttribute('data-monthly');
      el.textContent = targetValue;
      const centsElement = el.parentElement?.querySelector('.cents');
      const centsValue = isYearly ? el.getAttribute('data-yearly-cents') : el.getAttribute('data-monthly-cents');
      if (centsElement && centsValue) centsElement.textContent = centsValue;
    });

    billingNotes.forEach(el => {
      const noteText = isYearly ? el.getAttribute('data-yearly-note') : el.getAttribute('data-monthly-note');
      el.textContent = noteText;
    });
  });
}

/**
 * FAQ Accordion Expansion / Collapse
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerDiv = item.querySelector('.faq-answer');

    if (!questionBtn || !answerDiv) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other FAQs for clean UX
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBtn = otherItem.querySelector('.faq-question');
        const otherAns = otherItem.querySelector('.faq-answer');
        if (otherBtn && otherAns) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAns.style.maxHeight = null;
        }
      });

      // If clicked item wasn't open, open it
      if (!isOpen) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
        answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
      }
    });
  });
}

/**
 * Plan Selection Modal & Light-Dismiss
 */
function initPlanModal() {
  const modal = document.getElementById('plan-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const selectButtons = document.querySelectorAll('.btn-select-plan');
  const modalTitle = document.getElementById('modal-plan-title');
  const modalPrice = document.getElementById('modal-plan-price');
  const form = document.getElementById('plan-signup-form');

  if (!modal) return;

  selectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-plan-title');
      const price = btn.getAttribute('data-plan-price');

      if (modalTitle) modalTitle.textContent = title || 'Plano Selecionado';
      if (modalPrice) modalPrice.textContent = price || 'Consulte';

      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.setAttribute('open', 'true');
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  // Light dismiss: clicking on backdrop outside modal bounds
  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeModal();
    }
  });

  function closeModal() {
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
  }

  // Handle Form Submission -> WhatsApp Checkout
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const shopName = document.getElementById('shop-name')?.value || '';
      const ownerName = document.getElementById('owner-name')?.value || '';
      const phone = document.getElementById('whatsapp-phone')?.value || '';
      const selectedPlan = modalTitle?.textContent || 'Plano Katros';

      const message = `Olá! Meu nome é *${ownerName}* da barbearia *${shopName}* (${phone}). Gostaria de ativar o *${selectedPlan}* no Katros! ✂️🚀`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/5544999419907?text=${encodedMessage}`;

      closeModal();
      window.open(whatsappUrl, '_blank');
    });
  }
}
