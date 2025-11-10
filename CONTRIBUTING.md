# 🤝 Contributing to Rock Paper Scissors

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 🌟 Ways to Contribute

### 1. Report Bugs
- Check if bug already exists in issues
- Provide clear description
- Include steps to reproduce
- Share device/OS information
- Attach screenshots if applicable

### 2. Suggest Features
- Search existing feature requests
- Explain use case clearly
- Describe expected behavior
- Consider implementation impact

### 3. Submit Code
- Fork the repository
- Create feature branch
- Write clean, documented code
- Test thoroughly
- Submit pull request

### 4. Improve Documentation
- Fix typos and errors
- Clarify confusing sections
- Add missing information
- Create tutorials/guides

### 5. Share Designs
- UI/UX improvements
- Icon designs
- Splash screens
- Marketing materials

## 💻 Development Setup

### Prerequisites
```bash
# Required
node --version  # v14+
npm --version

# Optional
expo --version
```

### Clone & Install
```bash
# Fork and clone
git clone https://github.com/your-username/rock-paper-scissors-app.git
cd rock-paper-scissors-app

# Install dependencies
npm install

# Start development
npm start
```

## 🔧 Development Guidelines

### Code Style

#### JavaScript
```javascript
// Use const/let, not var
const gameResult = calculateWinner(player, computer);

// Use arrow functions
const handlePress = () => {
  playGame('rock');
};

// Use destructuring
const { player, computer } = score;

// Use template literals
const message = `Score: ${score.player} - ${score.computer}`;
```

#### React Components
```javascript
// Functional components with hooks
export default function MyComponent() {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  return (
    <View>
      {/* JSX */}
    </View>
  );
}
```

#### Styling
```javascript
// StyleSheet API
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### File Organization
```
components/
  ├── ComponentName.js      # Component code
  └── README.md            # Component documentation

App.js                     # Main app file
AppEnhanced.js            # Enhanced version
```

### Naming Conventions
- **Components**: PascalCase (MyComponent.js)
- **Functions**: camelCase (calculateScore)
- **Constants**: UPPER_SNAKE_CASE (MAX_STREAK)
- **Files**: PascalCase for components, camelCase for utilities

### Comments
```javascript
// Single line for brief explanations
const winner = getWinner(player, computer);

/**
 * Multi-line for complex logic
 * @param {string} player - Player's choice
 * @param {string} computer - Computer's choice
 * @returns {string} Winner ('player', 'computer', or 'draw')
 */
function getWinner(player, computer) {
  // Implementation
}
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] App launches successfully
- [ ] All buttons respond correctly
- [ ] Animations play smoothly
- [ ] Scores update accurately
- [ ] Haptic feedback works
- [ ] No crashes or freezes
- [ ] Works on iOS
- [ ] Works on Android

### Test on Multiple Devices
- iPhone (various sizes)
- iPad
- Android phones (various brands)
- Android tablets

### Performance Testing
- [ ] 60 FPS animations
- [ ] Quick response times
- [ ] Low memory usage
- [ ] Minimal battery drain

## 📝 Commit Guidelines

### Commit Message Format
```
type(scope): brief description

Detailed explanation if needed

Fixes #issue-number
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples
```
feat(game): add sound effects on win/loss

Added celebration sound for wins and consolation sound for losses.
Sounds can be toggled in settings.

Fixes #42
```

```
fix(ui): correct score alignment on small screens

Score display was misaligned on iPhone SE. Updated flex properties
to ensure proper alignment across all screen sizes.

Fixes #38
```

## 🔄 Pull Request Process

### 1. Before Creating PR
- [ ] Code follows style guidelines
- [ ] All features work as expected
- [ ] No new warnings or errors
- [ ] Documentation updated if needed
- [ ] Commits are clean and organized

### 2. Create Pull Request
1. Push to your fork
2. Navigate to original repository
3. Click "New Pull Request"
4. Fill out PR template
5. Submit for review

### 3. PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

### 4. After Submission
- Respond to review comments
- Make requested changes
- Keep PR up to date with main branch
- Be patient and respectful

## 🎯 Feature Priorities

### High Priority
- Bug fixes
- Performance improvements
- Accessibility features
- Critical features

### Medium Priority
- UI/UX enhancements
- New game modes
- Social features
- Analytics

### Low Priority
- Nice-to-have features
- Experimental ideas
- Cosmetic changes

## 🐛 Bug Report Template

```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Open app
2. Tap '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Device Info**
- Device: iPhone 13
- OS: iOS 16.0
- App Version: 1.0.0

**Screenshots**
If applicable

**Additional Context**
Any other relevant information
```

## 💡 Feature Request Template

```markdown
**Feature Description**
Clear description of the feature

**Problem it Solves**
What problem does this address?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other approaches you've thought about

**Additional Context**
Mockups, examples, etc.
```

## 🏆 Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in documentation
- Appreciated immensely! 🙏

## 📜 Code of Conduct

### Our Pledge
Create a welcoming, inclusive environment for everyone

### Our Standards
- Be respectful and considerate
- Accept constructive criticism
- Focus on what's best for community
- Show empathy towards others

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Public or private harassment
- Unprofessional conduct

## 📬 Contact

- GitHub Issues: For bugs and features
- GitHub Discussions: For questions and ideas
- Email: your-email@example.com (update this)

## 🎓 Learning Resources

### For Beginners
- [React Native Tutorial](https://reactnative.dev/docs/tutorial)
- [Expo Tutorial](https://docs.expo.dev/tutorial/introduction/)
- [JavaScript Basics](https://javascript.info/)

### For Advanced
- [React Native Performance](https://reactnative.dev/docs/performance)
- [Animation Guide](https://reactnative.dev/docs/animations)
- [Advanced Expo](https://docs.expo.dev/guides/overview/)

## ❓ FAQ

**Q: How do I get started?**
A: Fork the repo, install dependencies, and start exploring!

**Q: What if my PR isn't accepted?**
A: Don't worry! Feedback helps you learn. Make changes and resubmit.

**Q: Can I work on multiple features?**
A: Yes, but create separate branches and PRs for each.

**Q: How long until my PR is reviewed?**
A: Usually within a week. Be patient!

---

**Thank you for contributing! Every contribution, no matter how small, makes a difference! 🚀**

