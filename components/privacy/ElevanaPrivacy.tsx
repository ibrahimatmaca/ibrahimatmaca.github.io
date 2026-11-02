import React from 'react';
import PrivacyPolicy from './PrivacyPolicy';

const elevanaHtmlContent = `
    <h1>Elevana – Privacy Policy</h1>
    <p><strong>Last Updated:</strong> November 2, 2026<br>
    <strong>Developer:</strong> İbrahim Atmaca</p>

    <h2>Overview</h2>
    <p>Elevana helps you stay focused on your goals with manifests, vision boards, widgets and reminders. The app has no accounts and no servers of its own. Everything you enter stays on your device, and <strong>we do not collect, receive or sell your personal data</strong>.</p>
    <p>"Collect" here has the meaning Apple uses for App Store privacy labels: sending data off your device in a way that lets the developer or a third party access it. Elevana does store information on your device so the app can work. This policy explains what that information is, how it is used and how you can remove it.</p>

    <h2>Information Stored on Your Device</h2>
    <ul>
        <li><strong>Profile:</strong> the name you enter, your purpose for using the app and your interests. These are used to greet you and to choose which suggestions you see. Your name is optional.</li>
        <li><strong>Faith tradition:</strong> if you choose the spirituality purpose, you can select a religious tradition. See the next section.</li>
        <li><strong>Your content:</strong> goals, their descriptions and target dates, vision boards, quotes, images you add and wallpapers you create.</li>
        <li><strong>Settings and usage state:</strong> language, appearance, reminder time, widget configurations, the number of images generated today, and information used to decide when to show the App Store rating prompt.</li>
        <li><strong>Premium status:</strong> a saved copy of whether premium features are unlocked, so that the app and its widgets can respond correctly.</li>
    </ul>
    <p>This information is stored in the app's private storage and in an App Group container shared only with Elevana's own widgets. It is not sent to us or to any third party by Elevana.</p>

    <h2>Faith Tradition (Sensitive Information)</h2>
    <p>Religious belief is sensitive information, so this choice is handled with extra care:</p>
    <ul>
        <li>It is <strong>optional</strong>. You can choose "Prefer not to say" and still use the app.</li>
        <li>It is used <strong>only</strong> to decide which texts built into the app are shown to you.</li>
        <li>It stays <strong>on your device</strong> and is never sent to us or to anyone else by Elevana.</li>
        <li>You can change or remove it at any time in Settings &gt; Profile.</li>
    </ul>

    <h2>Tracking and Advertising</h2>
    <p>Elevana does <strong>not</strong> track you, show ads, or include third-party analytics or advertising SDKs. It does not access your location, contacts, camera, microphone, health data or advertising identifier.</p>

    <h2>Photos</h2>
    <p>When you add a photo to a vision board, you choose it in Apple's system photo picker. Elevana receives only the photos you select, and copies of them are kept in the app's storage on your device.</p>
    <p>If you save a vision board or wallpaper to Photos, iOS asks for permission to add items to your library. Elevana uses add-only access for this and cannot browse your library. The app continues to work if you decline.</p>

    <h2>On-Device Image Generation</h2>
    <p>On supported devices, Elevana can create images using Apple's Image Playground, which runs on your device with Apple Intelligence. The request is built only from the theme and style you select. Your goals, manifests, name and profile are not included. Generated images are stored on your device.</p>

    <h2>Notifications, Widgets and Search</h2>
    <p>Elevana uses local notifications scheduled on your device. It does not use push notifications or send data to a notification server.</p>
    <ul>
        <li><strong>Daily reminders</strong> are optional and may show the title of your goal.</li>
        <li><strong>Motivation notifications</strong> are sent in the morning, at noon and in the evening once you allow notifications. They are on by default and you can turn them off in Settings.</li>
    </ul>
    <p>You can also manage or disable all notifications in iOS Settings.</p>
    <p>To make the app's features work, your goal text and images may appear in these places on your device, where anyone who can see your screen may see them:</p>
    <ul>
        <li><strong>Lock Screen and Home Screen:</strong> notifications, widgets and Live Activities.</li>
        <li><strong>Spotlight search:</strong> your goals are added to your device's search index so you can find them. Spotlight results for an app can be managed in iOS Settings.</li>
    </ul>

    <h2>In-App Purchases</h2>
    <p>Purchases and subscriptions are handled by Apple through StoreKit. We do not receive or have access to your payment details, billing address or Apple Account information. Elevana asks StoreKit which purchases are active, including when you restore purchases, and keeps only the premium status described above. You can manage or cancel subscriptions in your Apple Account settings.</p>

    <h2>Third Parties and Data Sharing</h2>
    <p>Elevana does not sell or share your information. We do not operate any server that receives it.</p>
    <ul>
        <li><strong>Apple:</strong> the app uses Apple's system services, including StoreKit, Image Playground, notifications, widgets and the App Store rating prompt. These are governed by <a href="https://www.apple.com/privacy/" target="_blank" rel="noopener noreferrer">Apple's Privacy Policy</a>.</li>
        <li><strong>Lottie:</strong> this open-source library plays animations included in the app. It does not receive your data.</li>
        <li><strong>Sharing you choose:</strong> when you use the share sheet, the content goes to the app or person you select, under their privacy practices.</li>
        <li><strong>Reports from Apple:</strong> Apple may give developers aggregated download and sales reports. If you choose to share analytics with app developers in iOS Settings, Apple may also provide crash and usage data. This comes from Apple and is not collected by Elevana.</li>
    </ul>
    <p>Elevana is licensed to you under Apple's <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer">Standard End User License Agreement</a>.</p>

    <h2>Internet Access</h2>
    <p>The core features of Elevana work offline. An internet connection is used for Apple's in-app purchase services and when you open an external link, such as this policy.</p>

    <h2>Data Retention and Deletion</h2>
    <p>Your information stays on your device until you remove it. Because we hold none of it and there is no account, there is nothing for us to delete on our side.</p>
    <ul>
        <li><strong>In the app:</strong> delete goals and vision boards individually, and edit or clear your profile in Settings &gt; Profile.</li>
        <li><strong>Everything at once:</strong> delete Elevana from your device. This removes the app's data, including its widget data and search entries.</li>
        <li><strong>Items you moved elsewhere:</strong> images saved to Photos or content you shared are outside the app. Remove them where they are stored.</li>
        <li><strong>Backups:</strong> Elevana has no sync service of its own, but its data may be included in your iCloud or computer backups according to your device settings. Those backups are managed by you and Apple.</li>
    </ul>

    <h2>Security</h2>
    <p>Your information is protected by iOS app sandboxing and your device's security features. Using a device passcode helps keep it safe, as anyone who can unlock your device may be able to view the app's content.</p>

    <h2>Children's Privacy</h2>
    <p>Elevana is a general-audience app and is not designed specifically for children. It does not collect personal data from anyone, including children. A parent or guardian can review or remove information entered in the app directly on the device.</p>

    <h2>Your Rights</h2>
    <p>Depending on where you live, laws such as the GDPR and Türkiye's KVKK may give you rights over your personal data, including access, correction and deletion. Because your information stays on your device, you can exercise these rights directly in the app as described above. For any privacy question or request, contact us using the details below.</p>

    <h2>Changes to This Policy</h2>
    <p>We update this policy when Elevana's features or data practices change, and revise the "Last Updated" date above. The latest version is always available at:</p>
    <p><a href="https://ibrahimatmaca.github.io/elevana-privacy" target="_blank" rel="noopener noreferrer">https://ibrahimatmaca.github.io/elevana-privacy</a></p>

    <h2>Contact</h2>
    <p>If you have any questions about this policy, contact the developer, İbrahim Atmaca:</p>
    <p><strong>Email:</strong> <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a><br>
    <strong>Website:</strong> <a href="https://ibrahimatmaca.github.io" target="_blank" rel="noopener noreferrer">https://ibrahimatmaca.github.io</a></p>
`;

const ElevanaPrivacy: React.FC = () => {
  return <PrivacyPolicy title="Elevana Privacy Policy" htmlContent={elevanaHtmlContent} />;
};

export default ElevanaPrivacy;

