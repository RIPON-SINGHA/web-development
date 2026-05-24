const chakra = document.querySelector('.circle');

//we only need 12 spokes cause each one extends to each side. so one spoke spread bottom half of the circle too.
for (let i = 0; i < 12; i++) {
  const spoke = document.createElement('div');
  spoke.className = 'spoke';
  spoke.style.transform = `translateX(-50%) rotate(${i * 15}deg)`;
  chakra.appendChild(spoke);
}