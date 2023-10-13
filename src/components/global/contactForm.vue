<template>
    <a href=""></a>
        <h3 class="center">Get In Touch</h3>

        <form id="contact-form" method="POST" action="">
            <a name="contact"></a>

            <label>Name</label>
            <input required class="input-field" type="text" name="name">

            <label>Subject</label>
            <input required class="input-field" type="text" name="subject">

            <label>Email</label>
            <input required class="input-field" type="text" name="email">

            <label>Message</label>
            <textarea required class="input-field" name="message"></textarea>

            <input id="submit-btn" type="submit" value="Send">
        </form>
</template>

<script>
export default {
    name:'contactForm'
}
</script>
