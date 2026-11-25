# Calisthenics Tracker

A responsive personal calisthenics log for GitHub Pages. Includes a balanced 3-day plan, session logging, difficulty rating, skills, notes, history and a weekly activity chart.

## 1. Test locally
Because the app loads JSON and JavaScript modules, do not open `index.html` directly as a file. Use VS Code Live Server, or deploy to GitHub Pages.

## 2. Create Firebase
1. Open https://console.firebase.google.com/ and create a project.
2. Add a Web App in Project settings and copy its Firebase config.
3. In Authentication > Sign-in method, enable Google.
4. In Authentication > Settings > Authorized domains, add your GitHub Pages domain (for example `YOURNAME.github.io`).
5. Create a Firestore Database in production mode.
6. Paste the Web App config into `js/firebase.js`, replacing every `PASTE_...` value.

## 3. Firestore security rules
In Firestore Database > Rules, publish these rules. They allow each signed-in user to access only their own records.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{collectionName}/{documentId} {
      allow read, create: if request.auth != null && request.auth.uid == userId;
      allow update, delete: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Do not use public rules such as `allow read, write: if true`.

## 4. Publish on GitHub Pages
1. Create a GitHub repository named `calisthenics-tracker`.
2. Upload all files and folders from this project to the repository root.
3. Open repository Settings > Pages.
4. Under Build and deployment, choose Deploy from a branch.
5. Select `main` and `/ (root)`, then Save.
6. Wait for deployment and open the URL shown in Pages.
7. Sign in with Google.

## 5. Important notes
- Until Firebase is configured, records are stored in this browser's local storage only.
- After Firebase is configured and you sign in, records are written to Firestore.
- This starter does not yet migrate old local-only records into Firestore. Export/backup and migration should be added before relying on it for long-term records.
- Firebase web config is not a server secret; Firestore security rules are essential.
- The chart is a simple weekly session-count chart. It will populate after you save sessions.

## Current workout schedule
- Saturday: Push + Core
- Monday: Pull + Core
- Wednesday: Legs + Full Body

Adjust exercise variations to your current ability and stop if a movement causes joint pain.
