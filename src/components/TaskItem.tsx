import React, { useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/pen.png';
import { Task } from './TasksList';

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({
  toggleTaskDone,
  removeTask,
  editTask,
  task,
}: TaskItemProps) {
  const [isBeenEdited, setIsBeenEdited] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsBeenEdited(true);
  }

  function handleCancelEditing() {
    setNewTitle(task.title);
    setIsBeenEdited(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, newTitle);
    setIsBeenEdited(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isBeenEdited) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isBeenEdited]);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View style={task.done ? styles.taskMarkerDone : styles.taskMarker}>
            {task.done && <Icon name='check' size={12} color='#FFF' />}
          </View>

          <TextInput
            // value={newTitle}
            onChangeText={setNewTitle}
            editable={isBeenEdited}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
          >
            {task.title}
          </TextInput>
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isBeenEdited ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name='x' size={24} color='#b2b2b2' />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.divider} />

        <TouchableOpacity
          disabled={isBeenEdited}
          onPress={() => removeTask(task.id)}
        >
          <Image
            source={trashIcon}
            style={{ opacity: isBeenEdited ? 0.2 : 1 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 13,
    paddingRight: 24,
  },

  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 15,
  },

  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
});
