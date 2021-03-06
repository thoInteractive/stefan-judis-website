<template>
  <Container animate="true" accessible-line-length="true">
    <h1 slot="headline" tabindex="-1">Hey there! 👋</h1>
    <div class="c-tile">
      <div class="c-tile__container">
        <p>
          In case you're considering to let me speak at your event you probably need some information.
          First of all, I'm really happy about any invitation to speak somewhere... so
          <strong>thank you!</strong>
        </p>
        <p>
          You can find slides and recordings of my recent talks in the
          <a
            href="/talks/"
          >speak section</a>.
        </p>
        <p>But here we go with some basic information:</p>
        <dl>
          <dt>Short bio</dt>
          <dd>
            <Marked :markdown="me.speakerBio"></Marked>
          </dd>
          <dt>Favorite talk topics</dt>
          <dd>{{ me.favoriteSpeakerTopics.join(', ') }}</dd>
          <dt>Images</dt>
          <dd>
            <ul class="o-list-gridSmall">
              <li v-for="image in me.images" :key="image._id">
                <div class="u-flex-column u-height-100">
                  <!-- this container is needed because of a FF bug -->
                  <div>
                    <a :href="image.file.url" :aria-label="image.title">
                      <lazy-image :asset="image" :ratio="0.65"></lazy-image>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </dd>
          <dt>Past talks</dt>
          <dd>
            <ul>
              <li v-for="event in events" :key="event._id">
                <a :href="event.website">{{ event.name }}</a>
              </li>
            </ul>
          </dd>
          <dt>Technical equipment</dt>
          <dd>
            <ul>
              <li v-for="(tech, index) in me.speakerEquipment" :key="index">{{ tech }}</li>
            </ul>
          </dd>
          <dt>Additional info</dt>
          <dd>
            <ul>
              <li v-for="(pref, index) in me.additionalSpeakerInformation" :key="index">{{ pref }}</li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue';
import LazyImage from '~/components/LazyImage.vue';
import { createPage } from '~/lib/basepage.js';

export default createPage({
  async fetch({ app }) {
    const { getPastEvents, getMe } = app.contentful;
    await Promise.all([getPastEvents(), getMe()]);
  },
  computed: {
    events() {
      return this.$store.state.events.pastList;
    },
    me() {
      return this.$store.state.me.entry;
    }
  },
  head() {
    return {
      title: `Stefan Judis Web Development - Speaker information`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `You want me to speak at your event? Great - here is some basic information`
        }
      ]
    };
  },
  components: {
    Container,
    Marked: () => import('~/components/Marked.vue'),
    LazyImage
  }
});
</script>

<style scoped lang="postcss">
dt {
  font-size: 1.5em;
  padding: 0.25em 0;
  margin: 0 0 0.25em;
}

dd {
  margin: 0 0 0.5em;

  ul {
    margin-top: 0;
  }
}
</style>
