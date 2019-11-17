import { shallowMount } from '@vue/test-utils';
import item from '@/components/item.vue';

describe('item.vue', () => {
  it('renders props when passed', () => {
    const name = 'My Name';
    const alternate_url = 'URL';
    const address = { city: 'My  City' };
    const snippet = { requirement: '1', responsibility: '11' };

    const wrapper = shallowMount(item, {
      propsData: {
        name, alternate_url, address, snippet,
      },
    });
    expect(wrapper.text()).toMatch(name);
    expect(wrapper.text()).toMatch(address.city);
    expect(wrapper.text()).toMatch(snippet.requirement);
    expect(wrapper.text()).toMatch(snippet.responsibility);
  });
  it('renders class when passed', () => {
    const name = 'My Name';
    const alternate_url = 'URL';
    const address = { city: 'My  City' };
    const snippet = { requirement: '1', responsibility: '11' };

    const wrapper = shallowMount(item, {
      propsData: {
        name, alternate_url, address, snippet,
      },
    });

    expect(wrapper.classes('item')).toBe(true)

    const addressDiv = wrapper.find('.address')
    expect(addressDiv.is('div')).toBe(true)
    const snippetDiv = wrapper.find('.snippet')
    expect(snippetDiv.is('div')).toBe(true)
  });

  it('renders no class when passed', () => {
    const name = 'My Name';
    const alternate_url = 'URL';
    const address = false
    const snippet = false

    const wrapper = shallowMount(item, {
      propsData: {
        name, alternate_url, address, snippet,
      },
    });

    const addressDiv = wrapper.find('.address')
    expect(addressDiv.exists()).toBe(false)
    const snippetDiv = wrapper.find('.snippet')
    expect(snippetDiv.exists()).toBe(false)
  });
});
