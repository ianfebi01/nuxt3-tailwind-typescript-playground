<script lang="ts" setup>
const emit = defineEmits(["click"]);

// Props
interface Props {
  color?: string;
  bg?: string;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  loading?: boolean;
  border?: boolean;
  fontWeight?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "white",
  bg: "blue-600",
  type: "button",
  disabled: false,
  loading: false,
  border: false,
  fontWeight: "bold",
});

const buttonClass: ComputedRef<string> = computed(
  (): string =>
    `h-[44px] px-4 hover:brightness-[0.95] transition-all duration-300 font-${props.fontWeight
    } text-[14px] border ${props.border ? `border-${props.color}` : "border-none"
    } rounded-lg bg-${props.bg} text-${props.color}`
);
</script>

<template>
  <button :type="props.type" :class="buttonClass" :disabled="props.disabled" @click="emit('click')">
    <slot v-if="!props.loading" />
    <AtomsALoader v-else />
  </button>
</template>
