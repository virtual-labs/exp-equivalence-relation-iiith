class NecklaceEquivalence {
    constructor() {
        this.canvas = document.getElementById('necklaceCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.beadCount = 12; // Increased from 6
        this.colorCount = 4; // Increased from 2
        this.currentNecklace = [];
        this.targetNecklace = [];
        this.challengeActive = false;
        this.score = 0;
        this.attempts = 0;
        this.transformations = [];
        this.difficultyMode = 'easy'; // New: difficulty mode
        this.colorMapping = {}; // Now: color-to-color mapping for hard mode
        
        // Colors for beads
        this.beadColors = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#f97316', '#06b6d4', '#84cc16'];
        
        // Initialize
        this.setupCanvas();
        this.generateColorMapping();
        this.generateRandom();
        this.updateDisplay();
        this.updateColorMappingDisplay();
    }
    
    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        const containerStyle = window.getComputedStyle(container);
        const containerWidth = container.clientWidth - 
            parseFloat(containerStyle.paddingLeft) - 
            parseFloat(containerStyle.paddingRight);
        
        const containerHeight = Math.min(containerWidth * 0.6, 400);
        
        this.canvas.style.width = containerWidth + 'px';
        this.canvas.style.height = containerHeight + 'px';
        
        const scale = window.devicePixelRatio || 1;
        this.canvas.width = containerWidth * scale;
        this.canvas.height = containerHeight * scale;
        
        this.ctx.scale(scale, scale);
        this.draw();
    }
    
    generateRandom() {
        this.currentNecklace = [];
        for (let i = 0; i < this.beadCount; i++) {
            this.currentNecklace.push(Math.floor(Math.random() * this.colorCount));
        }
        this.transformations = [];
        this.updateTransformLog();
        this.draw();
    }
    
    draw() {
        const canvasWidth = this.canvas.width / (window.devicePixelRatio || 1);
        const canvasHeight = this.canvas.height / (window.devicePixelRatio || 1);
        
        // Clear canvas
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        // Draw two necklaces side by side if challenge is active
        if (this.challengeActive) {
            this.drawNecklace(this.targetNecklace, canvasWidth * 0.25, canvasHeight * 0.5, 
                            Math.min(canvasWidth * 0.15, canvasHeight * 0.3), 'Target');
            this.drawNecklace(this.currentNecklace, canvasWidth * 0.75, canvasHeight * 0.5, 
                            Math.min(canvasWidth * 0.15, canvasHeight * 0.3), 'Current');
        } else {
            this.drawNecklace(this.currentNecklace, canvasWidth * 0.5, canvasHeight * 0.5, 
                            Math.min(canvasWidth * 0.2, canvasHeight * 0.35), 'Current Pattern');
        }
    }
    
    drawNecklace(necklace, centerX, centerY, radius, label) {
        const beadRadius = Math.max(8, radius * 0.12); // Smaller beads for more beads
        const angleStep = (2 * Math.PI) / necklace.length;
        
        // Draw necklace circle (background)
        this.ctx.strokeStyle = '#d1d5db';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        
        // Draw beads
        necklace.forEach((colorIndex, i) => {
            const angle = i * angleStep - Math.PI / 2; // Start from top
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            // Bead shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            this.ctx.beginPath();
            this.ctx.arc(x + 1, y + 1, beadRadius, 0, 2 * Math.PI);
            this.ctx.fill();
            
            // Bead body
            let displayColorIndex = colorIndex;
            if (this.difficultyMode === 'hard') {
                // In hard mode, use the mapped color
                displayColorIndex = this.colorMapping[colorIndex] !== undefined ? this.colorMapping[colorIndex] : colorIndex;
            }
            this.ctx.fillStyle = this.beadColors[displayColorIndex % this.beadColors.length];
            this.ctx.beginPath();
            this.ctx.arc(x, y, beadRadius, 0, 2 * Math.PI);
            this.ctx.fill();
            
            // Bead border
            this.ctx.strokeStyle = '#374151';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            
            // Bead number/color indicator
            this.ctx.fillStyle = 'white';
            this.ctx.font = `bold ${Math.max(6, beadRadius * 0.6)}px Poppins`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            // In both modes, show position number for clarity
            this.ctx.fillText(i.toString(), x, y);
        });
        
        // Draw label
        this.ctx.fillStyle = '#374151';
        this.ctx.font = `bold ${Math.max(14, radius * 0.08)}px Poppins`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(label, centerX, centerY + radius + 30);
        
        // Draw string representation
        const stringRep = necklace.map(c => c.toString()).join('');
        this.ctx.font = `${Math.max(10, radius * 0.06)}px monospace`;
        this.ctx.fillText(`[${stringRep}]`, centerX, centerY + radius + 50);
        
        // Show color distribution
        const distribution = this.getColorDistribution(necklace);
        const distText = distribution.map((count, i) => `${i}:${count}`).filter(s => !s.endsWith(':0')).join(' ');
        this.ctx.font = `${Math.max(8, radius * 0.05)}px monospace`;
        this.ctx.fillText(distText, centerX, centerY + radius + 70);
    }
    
    rotateNecklace() {
        if (this.currentNecklace.length === 0) return;
        
        // Rotate right (move first element to end)
        const first = this.currentNecklace.shift();
        this.currentNecklace.push(first);
        
        this.transformations.push('Rotate →');
        this.updateTransformLog();
        this.draw();
    }
    
    reflectNecklace() {
        if (this.currentNecklace.length === 0) return;
        
        // Reflect the necklace (reverse except first element)
        const first = this.currentNecklace[0];
        const rest = this.currentNecklace.slice(1).reverse();
        this.currentNecklace = [first, ...rest];
        
        this.transformations.push('Reflect ↔');
        this.updateTransformLog();
        this.draw();
    }
    
    updateTransformLog() {
        const logElement = document.getElementById('transformLog');
        if (this.transformations.length === 0) {
            logElement.innerHTML = '<p class="text-xs text-gray-600">No transformations yet</p>';
            return;
        }
        
        const recentTransforms = this.transformations.slice(-8);
        logElement.innerHTML = recentTransforms.map((transform, index) => 
            `<div class="move-item">
                <span class="move-number">${this.transformations.length - recentTransforms.length + index + 1}</span>
                <span class="move-description">${transform}</span>
            </div>`
        ).join('');
    }
    
    areEquivalent(necklace1, necklace2) {
        if (necklace1.length !== necklace2.length) return false;
        
        const n = necklace1.length;
        const str1 = necklace1.join('');
        const str2 = necklace2.join('');
        
        // Check all rotations
        const doubled = str2 + str2;
        if (doubled.includes(str1)) return true;
        
        // Check reflections of all rotations
        for (let i = 0; i < n; i++) {
            const rotated = necklace2.slice(i).concat(necklace2.slice(0, i));
            const reflected = [rotated[0], ...rotated.slice(1).reverse()];
            const reflectedStr = reflected.join('');
            
            if (str1 === reflectedStr) return true;
        }
        
        return false;
    }
    
    // Generate a necklace with specified color distribution
    generateNecklaceWithDistribution(colorCounts) {
        const necklace = [];
        for (let color = 0; color < colorCounts.length; color++) {
            for (let i = 0; i < colorCounts[color]; i++) {
                necklace.push(color);
            }
        }
        
        // Shuffle the necklace
        for (let i = necklace.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [necklace[i], necklace[j]] = [necklace[j], necklace[i]];
        }
        
        return necklace;
    }
    
    // Get color distribution of a necklace
    getColorDistribution(necklace) {
        const distribution = new Array(this.colorCount).fill(0);
        necklace.forEach(color => {
            if (color < this.colorCount) {
                distribution[color]++;
            }
        });
        return distribution;
    }
    
    // Check if two color distributions are the same
    sameColorDistribution(dist1, dist2) {
        if (dist1.length !== dist2.length) return false;
        for (let i = 0; i < dist1.length; i++) {
            if (dist1[i] !== dist2[i]) return false;
        }
        return true;
    }
    
    newChallenge() {
        // Generate a color distribution for the challenge
        const colorDistribution = new Array(this.colorCount).fill(0);
        let remainingBeads = this.beadCount;
        
        // Ensure each color appears at least once if possible
        const minPerColor = Math.min(1, Math.floor(this.beadCount / this.colorCount));
        for (let i = 0; i < this.colorCount && remainingBeads > 0; i++) {
            colorDistribution[i] = minPerColor;
            remainingBeads -= minPerColor;
        }
        
        // Distribute remaining beads randomly
        while (remainingBeads > 0) {
            const colorIndex = Math.floor(Math.random() * this.colorCount);
            colorDistribution[colorIndex]++;
            remainingBeads--;
        }
        
        // Generate target necklace with this distribution
        this.targetNecklace = this.generateNecklaceWithDistribution(colorDistribution);
        
        // 60% chance to make it equivalent, 40% chance to make it different
        if (Math.random() < 0.6) {
            // Make equivalent - apply random transformations to target
            this.currentNecklace = [...this.targetNecklace];
            const numTransforms = Math.floor(Math.random() * 8) + 3; // More transformations
            
            for (let i = 0; i < numTransforms; i++) {
                if (Math.random() < 0.5) {
                    // Rotate (random amount)
                    const rotations = Math.floor(Math.random() * this.beadCount) + 1;
                    for (let r = 0; r < rotations; r++) {
                        const first = this.currentNecklace.shift();
                        this.currentNecklace.push(first);
                    }
                } else {
                    // Reflect
                    const first = this.currentNecklace[0];
                    const rest = this.currentNecklace.slice(1).reverse();
                    this.currentNecklace = [first, ...rest];
                }
            }
        } else {
            // Make different but with same color distribution
            let attempts = 0;
            do {
                this.currentNecklace = this.generateNecklaceWithDistribution(colorDistribution);
                attempts++;
                
                // Safety check to prevent infinite loop
                if (attempts > 50) {
                    // Force a difference by swapping two different colored beads
                    const color1Pos = this.currentNecklace.findIndex(c => c === 0);
                    const color2Pos = this.currentNecklace.findIndex(c => c !== 0);
                    
                    if (color1Pos !== -1 && color2Pos !== -1) {
                        // Create a pattern that's definitely not equivalent
                        this.currentNecklace = [...this.targetNecklace];
                        if (this.currentNecklace.length > 2) {
                            // Swap two adjacent beads if they're different
                            for (let i = 0; i < this.currentNecklace.length - 1; i++) {
                                if (this.currentNecklace[i] !== this.currentNecklace[i + 1]) {
                                    [this.currentNecklace[i], this.currentNecklace[i + 1]] = 
                                    [this.currentNecklace[i + 1], this.currentNecklace[i]];
                                    break;
                                }
                            }
                        }
                    }
                    break;
                }
            } while (this.areEquivalent(this.currentNecklace, this.targetNecklace));
        }
        
        this.challengeActive = true;
        this.transformations = [];
        
        document.getElementById('challengeQuestion').textContent = 
            'Are these two necklaces equivalent? (Can one be transformed into the other using rotations and reflections?)';
        
        document.getElementById('yesBtn').disabled = false;
        document.getElementById('noBtn').disabled = false;
        
        this.hideFeedback();
        this.updateTransformLog();
        this.draw();
    }
    
    answerEquivalent() {
        this.submitAnswer(true);
    }
    
    answerNotEquivalent() {
        this.submitAnswer(false);
    }
    
    submitAnswer(userAnswer) {
        if (!this.challengeActive) return;
        
        this.attempts++;
        const correctAnswer = this.areEquivalent(this.currentNecklace, this.targetNecklace);
        const isCorrect = userAnswer === correctAnswer;
        
        if (isCorrect) {
            this.score++;
        }
        
        this.showFeedback(isCorrect, correctAnswer);
        this.challengeActive = false;
        
        document.getElementById('yesBtn').disabled = true;
        document.getElementById('noBtn').disabled = true;
        
        this.updateDisplay();
    }
    
    showFeedback(isCorrect, correctAnswer) {
        const feedbackElement = document.getElementById('feedback');
        feedbackElement.classList.remove('hidden', 'bg-green-100', 'bg-red-100', 'text-green-800', 'text-red-800');
        
        if (isCorrect) {
            feedbackElement.classList.add('bg-green-100', 'text-green-800');
            feedbackElement.textContent = '✓ Correct! ' + 
                (correctAnswer ? 'These necklaces are equivalent.' : 'These necklaces are not equivalent.');
        } else {
            feedbackElement.classList.add('bg-red-100', 'text-red-800');
            feedbackElement.textContent = '✗ Incorrect. ' + 
                (correctAnswer ? 'These necklaces are actually equivalent.' : 'These necklaces are actually not equivalent.');
        }
    }
    
    hideFeedback() {
        const feedbackElement = document.getElementById('feedback');
        feedbackElement.classList.add('hidden');
    }
    
    updateDisplay() {
    //     document.getElementById('score').textContent = this.score;
    //     document.getElementById('attempts').textContent = this.attempts;
    //     document.getElementById('accuracy').textContent = 
    //         this.attempts > 0 ? Math.round((this.score / this.attempts) + 100) + '%' : '--%';
     }
    
    updateBeadCount() {
        const slider = document.getElementById('beadCountSlider');
        this.beadCount = parseInt(slider.value);
        document.getElementById('beadCountValue').textContent = this.beadCount;
        this.generateColorMapping();
        this.updateColorMappingDisplay();
        this.generateRandom();
        // Only call generateExamples if the container exists
        if (document.getElementById('exampleClasses')) {
            this.generateExamples();
        }
    }
    
    updateColorCount() {
        const slider = document.getElementById('colorCountSlider');
        this.colorCount = parseInt(slider.value);
        document.getElementById('colorCountValue').textContent = this.colorCount;
        this.generateColorMapping();
        this.updateColorMappingDisplay();
        this.generateRandom();
        // Only call generateExamples if the container exists
        if (document.getElementById('exampleClasses')) {
            this.generateExamples();
        }
    }
    
    resetStats() {
        this.score = 0;
        this.attempts = 0;
        this.challengeActive = false;
        this.transformations = [];
        
        document.getElementById('challengeQuestion').textContent = 'Click "New Challenge" to start!';
        document.getElementById('yesBtn').disabled = true;
        document.getElementById('noBtn').disabled = true;
        
        this.hideFeedback();
        this.updateDisplay();
        this.updateTransformLog();
        this.draw();
    }
    
    generateExamples() {
        const container = document.getElementById('exampleClasses');
        // Add safety check
        if (!container) {
            console.log('Example classes container not found - skipping example generation');
            return;
        }
        
        container.innerHTML = '';
        
        // Generate a few example equivalence classes
        const examples = this.getExampleClasses();
        
        examples.forEach((equivalenceClass, index) => {
            const classDiv = document.createElement('div');
            classDiv.className = 'bg-gray-50 p-4 rounded-lg';
            
            const title = document.createElement('h3');
            title.className = 'font-semibold text-gray-800 mb-3';
            title.textContent = `Class ${index + 1}`;
            classDiv.appendChild(title);
            
            equivalenceClass.forEach((necklace, i) => {
                const necklaceDiv = document.createElement('div');
                necklaceDiv.className = 'text-sm font-mono text-center py-1';
                necklaceDiv.textContent = `[${necklace.join('')}]`;
                classDiv.appendChild(necklaceDiv);
            });
            
            container.appendChild(classDiv);
        });
    }
    
    getExampleClasses() {
        // Generate some simple equivalence classes for demonstration
        const classes = [];
        
        if (this.beadCount === 4 && this.colorCount === 2) {
            classes.push([
                [0, 0, 0, 0]
            ]);
            classes.push([
                [0, 0, 0, 1],
                [0, 0, 1, 0],
                [0, 1, 0, 0],
                [1, 0, 0, 0]
            ]);
            classes.push([
                [0, 0, 1, 1],
                [0, 1, 1, 0],
                [1, 1, 0, 0],
                [1, 0, 0, 1]
            ]);
        } else {
            // Generate some random examples
            for (let i = 0; i < 3; i++) {
                const representative = [];
                for (let j = 0; j < Math.min(this.beadCount, 6); j++) {
                    representative.push(Math.floor(Math.random() * this.colorCount));
                }
                classes.push([representative]);
            }
        }
        
        return classes;
    }
    
    // New methods for difficulty mode and color mapping
    generateColorMapping() {
        // Generate a random color-to-color mapping for hard mode
        this.colorMapping = {};
        const indices = Array.from({ length: this.colorCount }, (_, i) => i);
        // Shuffle indices to create a random mapping
        const shuffled = indices.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        for (let i = 0; i < this.colorCount; i++) {
            this.colorMapping[i] = shuffled[i];
        }
    }
    
    getNumberForColor(colorIndex) {
        // No longer used for number mapping, but kept for compatibility
        return colorIndex;
    }
    
    changeDifficultyMode() {
        const radios = document.getElementsByName('difficultyMode');
        for (let radio of radios) {
            if (radio.checked) {
                this.difficultyMode = radio.value;
                break;
            }
        }
        
        // Show/hide color mapping panel
        const mappingPanel = document.getElementById('colorMappingPanel');
        if (this.difficultyMode === 'hard') {
            mappingPanel.classList.remove('hidden');
        } else {
            mappingPanel.classList.add('hidden');
        }
        
        this.generateColorMapping();
        this.updateColorMappingDisplay();
        this.draw();
    }
    
    updateColorMappingDisplay() {
        const display = document.getElementById('colorMappingDisplay');
        if (!display) return;
        
        display.innerHTML = '';
        for (let i = 0; i < this.colorCount; i++) {
            const mappedColor = this.colorMapping[i];
            const colorDiv = document.createElement('div');
            colorDiv.className = 'flex items-center space-x-2';
            colorDiv.innerHTML = `
                <div class="w-4 h-4 rounded-full border border-gray-400" style="background-color: ${this.beadColors[i]}"></div>
                <span class="font-mono">→</span>
                <div class="w-4 h-4 rounded-full border border-gray-400" style="background-color: ${this.beadColors[mappedColor]}"></div>
                <span class="font-mono">(Color ${i} → Color ${mappedColor})</span>
            `;
            display.appendChild(colorDiv);
        }
    }
}

// Global game instance
let necklaceGame;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    necklaceGame = new NecklaceEquivalence();
    
    // Update the initial slider values
    const beadCountSlider = document.getElementById('beadCountSlider');
    const colorCountSlider = document.getElementById('colorCountSlider');
    
    if (beadCountSlider) {
        beadCountSlider.value = necklaceGame.beadCount;
        document.getElementById('beadCountValue').textContent = necklaceGame.beadCount;
    }
    
    if (colorCountSlider) {
        colorCountSlider.value = necklaceGame.colorCount;
        document.getElementById('colorCountValue').textContent = necklaceGame.colorCount;
    }
});

// Control functions with safety checks
function updateBeadCount() {
    if (necklaceGame) {
        necklaceGame.updateBeadCount();
    }
}

function updateColorCount() {
    if (necklaceGame) {
        necklaceGame.updateColorCount();
    }
}

function generateRandom() {
    if (necklaceGame) {
        necklaceGame.generateRandom();
    }
}

function rotateNecklace() {
    if (necklaceGame) {
        necklaceGame.rotateNecklace();
    }
}

function reflectNecklace() {
    if (necklaceGame) {
        necklaceGame.reflectNecklace();
    }
}

function newChallenge() {
    if (necklaceGame) {
        necklaceGame.newChallenge();
    }
}

function answerEquivalent() {
    if (necklaceGame) {
        necklaceGame.answerEquivalent();
    }
}

function answerNotEquivalent() {
    if (necklaceGame) {
        necklaceGame.answerNotEquivalent();
    }
}

function resetStats() {
    if (necklaceGame) {
        necklaceGame.resetStats();
    }
}

function changeDifficultyMode() {
    if (necklaceGame) {
        necklaceGame.changeDifficultyMode();
    }
}

// Floating Panel Controls (Info and Settings panels)

document.addEventListener('DOMContentLoaded', function() {
    // Info panel
    const infoButton = document.getElementById('infoButton');
    const infoPanel = document.getElementById('infoPanel');
    const infoPanelClose = document.getElementById('infoPanelClose');
    
    // Settings panel
    const settingsButton = document.getElementById('settingsButton');
    const settingsPanel = document.getElementById('settingsPanel');
    const settingsPanelClose = document.getElementById('settingsPanelClose');
    
    // Panel toggle function
    function togglePanel(panel, button) {
        const isActive = panel.classList.contains('active');
        
        // Close all panels first
        document.querySelectorAll('.floating-panel').forEach(p => {
            p.classList.remove('active');
        });
        
        // Toggle current panel
        if (!isActive) {
            panel.classList.add('active');
            button.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                button.style.transform = '';
            }, 300);
        }
    }
    
    // Info panel events
    if (infoButton && infoPanel && infoPanelClose) {
        infoButton.addEventListener('click', function() {
            togglePanel(infoPanel, infoButton);
        });
        infoPanelClose.addEventListener('click', function() {
            infoPanel.classList.remove('active');
        });
    }
    
    // Settings panel events
    if (settingsButton && settingsPanel && settingsPanelClose) {
        settingsButton.addEventListener('click', function() {
            togglePanel(settingsPanel, settingsButton);
        });
        settingsPanelClose.addEventListener('click', function() {
            settingsPanel.classList.remove('active');
        });
    }
    
    // Close panels when clicking outside
    document.addEventListener('click', function(event) {
        const panels = [infoPanel, settingsPanel];
        const buttons = [infoButton, settingsButton];
        
        panels.forEach((panel, index) => {
            if (panel && buttons[index] && 
                !panel.contains(event.target) && 
                !buttons[index].contains(event.target) && 
                panel.classList.contains('active')) {
                panel.classList.remove('active');
            }
        });
    });
});